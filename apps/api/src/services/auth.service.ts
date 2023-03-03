import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import * as _ from 'lodash';
import { RegistrationDto, UserDto, ValidateNewUserDto, ValidateUserDto } from '@boilerplate/shared';
import { UsersService } from './users.service';
import { prohibitedDomains } from './../constants';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}

	public async validateUser(email: string, password: string): Promise<ValidateUserDto> {
		const foundUser: UserDto | null = await this.usersService.findByEmail(email);

		if (foundUser?.password) {
			const isEqual = await compare(password, foundUser.password);

			if (isEqual) return { user: _.omit(foundUser, 'password') };

			return { error: true, message: 'Incorrect password' };
		}

		return { error: true, message: 'This user does not exist' };
	}

	public async validateNewUser(email: string): Promise<ValidateNewUserDto> {
		const accessDenied = this.domainBan(email);

		if (accessDenied) {
			return { error: true, message: 'The email address has a forbidden domain' };
		}

		const foundUser: UserDto | null = await this.usersService.findByEmail(email);

		if (!foundUser) {
			return { registration: true };
		}

		return { error: true, message: 'User with this email address already exists' };
	}

	public async registrateUser(newUserDto: RegistrationDto): Promise<Omit<RegistrationDto, 'password'>> {
		const saltOfRounds = 10;
		const hashPassword = await hash(newUserDto.password, saltOfRounds);

		if (newUserDto.lastName === '') {
			delete newUserDto.lastName;
		}

		const newUser = await this.usersService.createUser({
			...newUserDto,
			password: hashPassword,
		});

		return <Omit<RegistrationDto, 'password'>>_.omit(newUser, 'password');
	}

	private domainBan(email: string): boolean {
		let accessDenied: boolean = false;

		for (const domain of prohibitedDomains) {
			if (domain.test(email)) {
				return (accessDenied = true);
			}
		}

		return accessDenied;
	}
}
