import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ValueDto } from '@boilerplate/shared';
import { Controller, Index, Value } from '@boilerplate/data';
import { ControllerSocketEventsEnum } from '@boilerplate/shared';

@Injectable()
export class ValueGeneratorService {
	constructor(
		@InjectRepository(Controller) private readonly controllersRepository: Repository<Controller>,
		@InjectRepository(Index) private readonly indexRepository: Repository<Index>,
		@InjectRepository(Value) private readonly valuesRepository: Repository<Value>,
		private eventEmitter: EventEmitter2
	) {}

	// GET
	public async findAll(hardwareCode: string): Promise<Controller> {
		const controller = await this.controllersRepository
			.createQueryBuilder('controllers')
			.addSelect(['controllers.hardwareCode'])
			.where('controllers.hardwareCode = :hardwareCode', { hardwareCode })
			.leftJoinAndSelect('controllers.indexes', 'indexes')
			.leftJoinAndSelect('indexes.tolerances', 'tolerances')
			.getOne();

		if (!controller) {
			throw new ForbiddenException('Controller not found!');
		}

		return controller;
	}

	// CREATE
	public async createNewValues(newValues: ValueDto[], controllerId: string) {
		newValues.forEach(async (newValue) => {
			await this.valuesRepository.insert(newValue);
			const foundIndex = await this.indexRepository.findOne({ where: { id: newValue.indexId } });

			if (!foundIndex) {
				throw new ForbiddenException('Index not found!');
			}

			foundIndex.previousValue = foundIndex.lastValue;
			foundIndex.lastValue = newValue.value;

			await this.indexRepository.save(foundIndex);
		});

		this.eventEmitter.emit(ControllerSocketEventsEnum.NewValuesForIndexCreated, controllerId);
	}
}
