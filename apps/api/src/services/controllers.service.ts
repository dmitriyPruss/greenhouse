import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, SelectQueryBuilder } from 'typeorm';
import { ControllerDto, ControllerFilter, KeyAccessDto, ListWithTotals } from '@boilerplate/shared';
import { Access, Controller, Role, Value, Key, Index } from '@boilerplate/data';
import { ControllerHandlersRepository } from './repositories/controller-handlers.repository';

@Injectable()
export class ControllersService {
	constructor(
		@InjectRepository(Access) private readonly accessesRepository: Repository<Access>,
		@InjectRepository(Controller) private readonly controllersRepository: Repository<Controller>,
		@InjectRepository(Index) private readonly indexesRepository: Repository<Index>,
		@InjectRepository(Role) private readonly roleRepository: Repository<Role>,
		@InjectRepository(Value) private readonly valuesRepository: Repository<Value>,
		@InjectRepository(Key) private readonly keysRepository: Repository<Key>,
		private readonly controllerHandlersRepository: ControllerHandlersRepository
	) {}

	// READ
	public async findAll(userId: string, filter: ControllerFilter): Promise<ListWithTotals<ControllerDto>> {
		let accessesQuery = await this.accessesRepository
			.createQueryBuilder('accesses')
			.where('accesses.userId = :userId', { userId })
			.getMany();

		const controllerIds = accessesQuery.map((access) => access.controllerId);

		let controllersQuery: SelectQueryBuilder<ControllerDto> = this.controllersRepository
			.createQueryBuilder('controllers')
			.where({ id: In(controllerIds) })
			.orderBy('controllers.createdAt', 'DESC') as any;

		if (filter?.search) {
			const search = `%${filter?.search}%`;

			controllersQuery.where('"controllers"."name" ilike :search', { search });
		}

		const data: ListWithTotals<ControllerDto> = await controllersQuery.getManyWithTotals(filter);

		for (const controller of data.list) {
			const indexes = await this.indexesRepository
				.createQueryBuilder('indexes')
				.where('indexes.controllerId = :controllerId', { controllerId: controller.id })
				.getMany();

			controller.indexes = indexes as any;

			const currentAccess = accessesQuery.find((i) => i.controllerId === controller.id);

			const role = await this.roleRepository.findOne({ where: { id: currentAccess.roleId } });

			(controller as any).role = role.name;
		}

		return data;
	}

	// READ - by Id
	public async findById(id: string): Promise<Controller | null> {
		const { getController, setTolerances } = this.controllerHandlersRepository;

		const controller = await getController(id);

		for (const index of controller.indexes) {
			await setTolerances(index.tolerances);
		}

		return controller;
	}

	public async findKeys(id: string, filter: ControllerFilter): Promise<any> {
		const keys = await this.keysRepository
			.createQueryBuilder('keys')
			.where('keys.controllerId = :id', { id })
			.leftJoinAndSelect('keys.role', 'role')
			.getManyWithTotals(filter);

		const controller = await this.controllersRepository.findOne({ where: { id } });

		const newKeys: any = keys;
		newKeys.controller = controller;

		if (!keys) {
			throw new ForbiddenException('Keys not found!');
		}

		return keys as any;
	}

	public async findByIdWithValues(id: string): Promise<Controller | null> {
		const { getController, setTolerances } = this.controllerHandlersRepository;

		const controller = await getController(id);

		for (const index of controller.indexes) {
			index.values = await this.valuesRepository
				.createQueryBuilder('values')
				.where('values.indexId = :indexId', { indexId: index.id })
				.orderBy('values.createdAt', 'DESC')
				.take(10)
				.getMany();

			await setTolerances(index.tolerances);
		}

		return controller;
	}

	public async findByHardwareCode(id: string, hardwareCode: string) {
		return await this.controllersRepository
			.createQueryBuilder('controllers')
			.addSelect(['controllers.hardwareCode'])
			.where('controllers.id = :id', { id })
			.andWhere('controllers.hardwareCode = :hardwareCode', { hardwareCode })
			.getOne();
	}

	public async findByIdForSocket(id: string): Promise<Controller | null> {
		const controller = await this.controllersRepository
			.createQueryBuilder('controllers')
			.where('controllers.id = :id', { id })
			.leftJoinAndSelect('controllers.indexes', 'indexes')
			.select([
				'controllers.id',
				'indexes.id',
				'indexes.createdAt',
				'indexes.updatedAt',
				'indexes.previousValue',
				'indexes.lastValue',
			])
			.getOne();

		for (const index of controller.indexes) {
			index.values = await this.valuesRepository
				.createQueryBuilder('values')
				.select(['values.id', 'values.value', 'values.createdAt'])
				.where('values.indexId = :indexId', { indexId: index.id })
				.orderBy('values.createdAt', 'DESC')
				.take(10)
				.getMany();
		}

		return controller;
	}

	//  CREATE
	public async createController(dto) {
		const { createTolerances, chooseTypes } = this.controllerHandlersRepository;

		await createTolerances(dto.indexes);

		await chooseTypes(dto.indexes);

		const newControllerEntity = this.controllersRepository.create(dto as Controller);

		const controller = await this.controllersRepository.save(newControllerEntity);

		const adminRole = await this.roleRepository.findOne({
			where: {
				name: 'ADMIN',
			},
		});

		const newKey: KeyAccessDto = { controllerId: controller.id, roleId: adminRole.id };

		const newKeyEntity = this.keysRepository.create(newKey as any);

		await this.keysRepository.save(newKeyEntity as any);

		return controller;
	}

	public async setNewKey(body: { id: string; role: string }) {
		const foundRole = await this.roleRepository.findOne({
			where: {
				name: body.role,
			},
		});

		const newKey: KeyAccessDto = { controllerId: body.id, roleId: foundRole.id };

		const newKeyEntity = this.keysRepository.create(newKey as any);

		return await this.keysRepository.save(newKeyEntity);
	}

	// UPDATE
	public async updateController(id: string, dto) {
		const { addIndexes, synchronizeIndexes, updateTolerances, chooseTypes } = this.controllerHandlersRepository;

		await updateTolerances(dto.indexes);

		await chooseTypes(dto.indexes);

		const controllerEntity = this.controllersRepository.create(dto as Controller);

		const controllerBeforeUpdate = await this.findById(id);

		await synchronizeIndexes(controllerBeforeUpdate, controllerEntity, id);

		const updatedController = await this.findById(id);

		updatedController.indexes.forEach((index) => {
			index.tolerances.forEach((tolerance) => {
				delete tolerance.dangerRate;
				delete tolerance.color;
				delete tolerance.label;
			});
		});

		updatedController.name = controllerEntity.name;
		updatedController.description = controllerEntity.description;

		const newIndexes = addIndexes(controllerEntity);

		updatedController.indexes = [...updatedController.indexes, ...newIndexes];

		return await this.controllersRepository.save(updatedController);
	}

	public async deactivate(id: string, deactivated: boolean) {
		const foundKey = await this.keysRepository.findOne({ where: { id } });

		if (deactivated) {
			foundKey.isDeactivated = new Date();
		}

		return await this.keysRepository.save(foundKey);
	}

	// DELETE
	public async deleteController(id: string) {
		await this.controllersRepository.delete(id);
	}
}
