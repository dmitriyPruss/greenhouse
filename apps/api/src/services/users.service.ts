import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { RegistrationDto, UserDto, UserFilter } from '@boilerplate/shared';
import { User } from '@boilerplate/data';
import {
	getLimitOptionFromFilter,
	getOffsetOptionFromFilter,
	getOrderOptionsFromFilter,
} from './extensions/filters/base-filters-extensions';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

	public async findAll(filter: UserFilter): Promise<UserDto[]> {
		return this.usersRepository.find({
			order: getOrderOptionsFromFilter(filter),
			take: getLimitOptionFromFilter(filter),
			skip: getOffsetOptionFromFilter(filter),
		});
	}

	public async findByEmail(email: string): Promise<UserDto | null> {
		return await this.usersRepository.findOne({ where: { email } });
	}

	public async findById(id: string): Promise<UserDto | null> {
		const currentUser = await this.usersRepository.findOne({ where: { id } });

		return _.omit(currentUser, ['password']);
	}

	public async createUser(dto: RegistrationDto) {
		const user = this.usersRepository.create(dto);
		return await this.usersRepository.save(user);
	}
}
