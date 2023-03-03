import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SocketGateway } from './socket.gateway';
import { ServicesModule } from '../services/services.module';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
	imports: [
		forwardRef(() => ServicesModule),
		ConfigModule,
		WinstonModule.forRoot({
			transports: [
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.timestamp(),
						winston.format.ms(),
						nestWinstonModuleUtilities.format.nestLike()
					),
					level: 'info',
				}),
			],
		}),
	],
	providers: [SocketGateway],
	exports: [SocketGateway],
})
export class SocketModule {}
