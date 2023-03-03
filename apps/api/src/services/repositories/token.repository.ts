import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from '@boilerplate/data';

@Injectable()
export class TokenRepository {
	constructor(
		@InjectRepository(RefreshToken) private readonly refreshTokenRepository: Repository<RefreshToken>,
		private readonly jwtService: JwtService
	) {}

	public async createRefreshToken(userId: string, period: number): Promise<RefreshToken> {
		const time = new Date();
		const expires = new Date(time.getTime() + period);

		const oldTokens = await this.refreshTokenRepository.find({ where: { userId } });

		oldTokens.forEach(async (oldToken) => {
			await this.refreshTokenRepository.delete({ id: oldToken.id });
		});

		const refreshToken = this.refreshTokenRepository.create({
			isRevoked: false,
			expires,
			userId,
		});

		return await this.refreshTokenRepository.save(refreshToken);
	}

	public async decodeRefreshToken(refreshToken: string) {
		try {
			return await this.jwtService.verifyAsync(refreshToken);
		} catch (error) {
			console.log('error', error);
		}
	}

	public async setRevokedRefreshTokens() {
		const foundRefreshTokens = await this.refreshTokenRepository.find();

		foundRefreshTokens.forEach(async (foundRefreshToken) => {
			const currentTime = new Date();

			if (foundRefreshToken.expires.getTime() <= currentTime.getTime()) {
				foundRefreshToken.isRevoked = true;

				await this.refreshTokenRepository.save(foundRefreshToken);
			}
		});
	}

	public async removeRevokedRefreshTokens() {
		const foundRefreshTokens = await this.refreshTokenRepository.find({ where: { isRevoked: true } });

		await this.refreshTokenRepository.remove([...foundRefreshTokens]);
	}
}
