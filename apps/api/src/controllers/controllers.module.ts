import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { HealthController } from './health.controller';
import { AuthController } from './auth.controller';
import { TerminusModule } from '@nestjs/terminus';
import { ServicesModule } from '../services/services.module';
import { ControllersController } from './controllers.controller';
import { AccessesController } from './accesses.controller';
import { ValueGeneratorController } from './value-generator.controller';

@Module({
	imports: [TerminusModule, ServicesModule],
	controllers: [
		UsersController,
		HealthController,
		AuthController,
		ControllersController,
		AccessesController,
		ValueGeneratorController,
	],
})
export class ControllersModule {}
