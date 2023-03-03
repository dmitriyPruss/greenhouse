import { Controller, Get, Query, UseGuards, Body, Res, Req, Post } from '@nestjs/common';
import { Request, Response } from 'express';
import { RegistrationDto, UserDto, UserFilter } from '@boilerplate/shared';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../services/guard/jwt.guard';
import { RegistrationGuard } from '../services/guard/registration.guard';
import { TokenService } from '../services/token.service';
import { refreshTokenConstants } from './../constants';

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly authService: AuthService,
		private readonly tokenService: TokenService
	) {}

	@UseGuards(JwtAuthGuard)
	@Get('/user')
	public async getUser(@Req() req: Request) {
		const user: UserDto = req.user as any;

		return await this.usersService.findById(user.id);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	public async findAll(@Query() filter: UserFilter, @Req() req: Request): Promise<UserDto[]> {
		return await this.usersService.findAll(filter);
	}

	// @Put()
	// public async create(@Body() entity: UserDto): Promise<UserDto> {
	//   return this.usersService.upsert(entity);
	// }

	@UseGuards(RegistrationGuard)
	@Post('/signup')
	public async registration(@Body() newUserDto: RegistrationDto, @Res({ passthrough: true }) res: Response) {
		const { expiresIn } = refreshTokenConstants;

		const newUser = <RegistrationDto>await this.authService.registrateUser(newUserDto);

		const accessToken = await this.tokenService.generateAccessToken(newUser);

		const refreshToken = await this.tokenService.generateRefreshToken(newUser, expiresIn);

		return {
			accessToken,
			refreshToken,
		};
	}
}
