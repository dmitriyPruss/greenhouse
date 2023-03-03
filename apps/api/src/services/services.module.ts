import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {
	Controller,
	DatabaseModule,
	Index,
	RefreshToken,
	Tolerance,
	Type,
	User,
	DangerRate,
	Color,
	Label,
	Access,
	Role,
	Value,
	Key,
} from '@boilerplate/data';
import { UsersService } from './users.service';
import { AccessesService } from './accesses.service';
import { ControllersService } from './controllers.service';
import { UserToControllerHasAccessService } from './user-to-controller-has-access.service';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { ValueGeneratorService } from './value-generator.service';
import { ControllersSocketEventsService } from './events/controllers-socket.events';
import { JwtAuthGuard } from './guard/jwt.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { RegistrationGuard } from './guard/registration.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { TokenRepository } from './repositories/token.repository';
import { ControllerHandlersRepository } from './repositories/controller-handlers.repository';
import { jwtConstants } from '../constants';
import { SocketModule } from '../socket/socket.module';
import { SocketGateway } from '../socket/socket.gateway';

@Module({
	imports: [
		DatabaseModule.forFeature([
			Access,
			Role,
			User,
			RefreshToken,
			Controller,
			Index,
			Tolerance,
			Type,
			Color,
			Label,
			DangerRate,
			Value,
			Key,
		]),
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: {
				expiresIn: jwtConstants.expiresIn,
			},
		}),
	],
	providers: [
		UsersService,
		AccessesService,
		AuthService,
		UserToControllerHasAccessService,
		TokenService,
		ValueGeneratorService,
		ControllersService,
		JwtStrategy,
		LocalStrategy,
		JwtAuthGuard,
		LocalAuthGuard,
		RegistrationGuard,
		TokenRepository,
		ControllerHandlersRepository,
		ControllersSocketEventsService,
		SocketModule,
		SocketGateway,
	],
	exports: [
		UsersService,
		AccessesService,
		AuthService,
		TokenService,
		ControllersService,
		ValueGeneratorService,
		ControllersSocketEventsService,
		UserToControllerHasAccessService,
	],
})
export class ServicesModule {}
