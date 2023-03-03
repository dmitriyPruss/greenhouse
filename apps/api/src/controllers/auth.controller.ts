import { Body, Controller, UseGuards, Res, Req, Post, Param, Delete, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';
import { RefreshTokenDto, UserDto } from '@boilerplate/shared';
import { LocalAuthGuard } from '../services/guard/local-auth.guard';
import { TokenService } from '../services/token.service';
import { refreshTokenConstants } from '../constants';

@Controller('auth')
export class AuthController {
	constructor(private readonly tokenService: TokenService) {}

	@UseGuards(LocalAuthGuard)
	@Post('/login')
	public async login(@Req() req: Request) {
		const user = req.user as UserDto;

		if (!user) {
			throw new ForbiddenException('Access denied!');
		}

		const { expiresIn } = refreshTokenConstants;

		const accessToken = await this.tokenService.generateAccessToken(user);

		const refreshToken = req.body.remember
			? await this.tokenService.generateRefreshToken(user, expiresIn * 100)
			: await this.tokenService.generateRefreshToken(user, expiresIn);

		return {
			accessToken,
			refreshToken,
		};
	}

	@Post('/refresh')
	public async refresh(@Body() body: RefreshTokenDto, @Res({ passthrough: true }) res: Response) {
		const { refreshToken: token, userId } = body;

		return await this.tokenService.refreshTokens(token, userId);
	}

	@Delete('/logout/:refreshToken')
	public async logOut(@Param('refreshToken') refreshToken: string): Promise<void> {
		await this.tokenService.removeToken(refreshToken);

		await this.tokenService.removeRevokedTokens();
	}
}
