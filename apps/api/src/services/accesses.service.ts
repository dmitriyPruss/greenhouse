import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessDto, UserDto } from '@boilerplate/shared';
import { Access, Role, Key } from '@boilerplate/data';

@Injectable()
export class AccessesService {
	constructor(
		@InjectRepository(Access) private readonly accessesRepository: Repository<Access>,
		@InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
		@InjectRepository(Key) private readonly keysRepository: Repository<Key>
	) {}

	public async doesHaveAdminRights(userId: string, controllerId: string, method: string) {
		const access = await this.accessesRepository
			.createQueryBuilder('accesses')
			.where('accesses.userId = :userId', { userId })
			.andWhere('accesses.controllerId = :controllerId', { controllerId })
			.leftJoinAndSelect('accesses.role', 'role')
			.getOne();

		if (!access) {
			return null;
		}

		const { name } = access.role;

		if (name !== 'ADMIN') {
			if (method === 'PATCH') {
				throw new ForbiddenException('You do not have permission to edit this controller');
			}
			if (method === 'DELETE') {
				throw new ForbiddenException('You do not have permission to delete this controller');
			}
			if (method === 'GET') {
				throw new ForbiddenException('You do not have permission to get info about keys');
			}
		}

		return true;
	}

	public async setAdminAccess(userId: string, controllerId: string, controller: any, user: UserDto) {
		const adminRole = await this.rolesRepository.findOne({
			where: {
				name: 'ADMIN',
			},
		});

		const newAccess: AccessDto = {
			userId,
			controllerId,
			roleId: adminRole.id,
			controller,
			user,
			role: adminRole as any,
		};

		const newAccessEntity = this.accessesRepository.create(newAccess as any);

		return await this.accessesRepository.save(newAccessEntity as any);
	}

	public async setAccess(userId: string, key: string) {
		const foundKey = await this.keysRepository.findOne({ where: { key } });

		if (!foundKey) {
			return null;
		}

		const foundAccessForUser = await this.accessesRepository.findOne({
			where: { controllerId: foundKey.controllerId, userId },
		});

		if (foundAccessForUser) {
			return null;
		}

		if (foundKey.isDeactivated) {
			return null;
		}

		const newAccessData: AccessDto = {
			controllerId: foundKey.controllerId,
			userId,
			roleId: foundKey.roleId,
		};

		const newAccessEntity = this.accessesRepository.create(newAccessData as unknown);

		return await this.accessesRepository.save(newAccessEntity);
	}
}
