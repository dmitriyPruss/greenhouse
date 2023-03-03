import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Access } from '@boilerplate/data';

@Injectable()
export class UserToControllerHasAccessService {
	constructor(@InjectRepository(Access) private readonly accessesRepository: Repository<Access>) {}

	public async checkUserHasAccessToController(userId: string, controllerId: string): Promise<boolean> {
		const access = await this.accessesRepository
			.createQueryBuilder('accesses')
			.where('accesses.userId = :userId', { userId })
			.andWhere('accesses.controllerId = :controllerId', { controllerId })
			.getOne();

		if (!access) {
			return false;
		}

		return true;
	}
}
