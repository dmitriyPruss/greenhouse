import { IsEmail, MinLength, MaxLength, IsNotEmpty, Matches } from 'class-validator';
import { Match } from './match-decorator';

export class UserDto {
	id: string;
	name: string;
	lastName?: string;
	email: string;
	password?: string;
	refreshTokens?: any;
	createdAt?: Date;
	updatedAt?: Date;
}

export class RegistrationDto {
	id?: string;

	@Matches(/^[A-Z][a-z]+(-[A-Z][a-z]*)?$/, {
		message: 'Only Latin! The first character must be a capital letter',
	})
	@MinLength(2, { message: 'Name is too short' })
	@MaxLength(25, {
		message: 'Name is too long',
	})
	name: string;

	@Matches(/^([A-Z][a-z]+)?(-[A-Z][a-z]*)?$/, {
		message: 'Only Latin! First character - a capital letter. Minimum 2 letters',
	})
	@MaxLength(25, {
		message: 'Name is too long',
	})
	lastName?: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&_*].*)/, {
		message: 'The password must include one upper and lower case letter, a number and a special character',
	})
	@MinLength(8, { message: 'Password is too short or empty' })
	@MaxLength(20, {
		message: 'Password is too long',
	})
	password: string;

	refreshTokens?: any;
}

export class LoginDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&_*].*)/, {
		message: 'The password must include one upper and lower case letter, a number and a special character',
	})
	@MinLength(8, { message: 'Password is too short or empty' })
	@MaxLength(20, {
		message: 'Password is too long',
	})
	password: string;

	remember?: boolean;
}

export class CheckedDto extends RegistrationDto {
	@Match('password', { message: 'Passwords don`t match' })
	@IsNotEmpty({ message: 'Password should not be empty' })
	checkPassword?: string;
}

export interface ValidateUserDto {
	user?: UserDto;
	error?: boolean;
	message?: string;
}

export interface ValidateNewUserDto extends ValidateUserDto {
	registration?: boolean;
}
