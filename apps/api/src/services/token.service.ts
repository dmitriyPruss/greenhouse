import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { RefreshToken } from '@boilerplate/data';
import { RegistrationDto, UserDto } from '@boilerplate/shared';
import { TokenRepository } from './repositories/token.repository';
import { refreshTokenConstants } from '../constants';

@Injectable()
export class TokenService {
	constructor(
		@InjectRepository(RefreshToken) private readonly refreshTokenRepository: Repository<RefreshToken>,
		private readonly usersService: UsersService,
		private readonly tokenRepository: TokenRepository,
		private readonly jwtService: JwtService
	) {}

	public async generateAccessToken(user: UserDto | Omit<RegistrationDto, 'password'>): Promise<string> {
		const options = {
			subject: user.id,
		};

		return await this.jwtService.signAsync({}, options);
	}

	public async generateRefreshToken(
		user: UserDto | Omit<RegistrationDto, 'password'>,
		expiresIn: number
	): Promise<string> {
		const refreshToken = await this.tokenRepository.createRefreshToken(user.id, expiresIn);

		const options = {
			expiresIn,
			subject: user.id,
			jwtid: refreshToken.id,
		};

		return await this.jwtService.signAsync({}, options);
	}

	public async refreshTokens(token: string, userId: string) {
		const user = await this.usersService.findById(userId);

		if (!user) {
			throw new ForbiddenException('Access denied!');
		}

		const { jti } = await this.tokenRepository.decodeRefreshToken(token);

		const foundRefreshToken = await this.refreshTokenRepository.findOne({ where: { id: jti } });

		if (!foundRefreshToken) {
			throw new ForbiddenException('Access denied!');
		}

		const { expiresIn } = refreshTokenConstants;

		const accessToken = await this.generateAccessToken(user);

		const refreshToken = await this.generateRefreshToken(user, expiresIn);

		return { accessToken, refreshToken };
	}

	public async verifyToken(token: string) {
		const { sub } = await this.jwtService.verifyAsync(token);

		if (!sub) {
			throw new NotFoundException('User`s id not found');
		}

		const user = await this.usersService.findById(sub);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}

	public async removeToken(refreshToken: string): Promise<void> {
		const { jti } = await this.tokenRepository.decodeRefreshToken(refreshToken);

		await this.refreshTokenRepository.delete({ id: jti });
	}

	public async removeRevokedTokens() {
		await this.tokenRepository.setRevokedRefreshTokens();

		await this.tokenRepository.removeRevokedRefreshTokens();
	}
}
