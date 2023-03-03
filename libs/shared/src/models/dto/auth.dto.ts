import { IsNotEmpty } from 'class-validator';
import { RegistrationDto, UserDto } from './user.dto';

export class RefreshTokenDto {
	@IsNotEmpty({ message: 'The refresh token is required' })
	readonly refreshToken: string;

	userId?: string;
}

export interface RefreshTokenPayloadDto {
	jti: string;
	sub: string;
}

export interface AuthPayloadDto {
	accessToken: string;
	refreshToken: string;
}

export interface AuthResponseDto {
	data: AuthPayloadDto;
}
