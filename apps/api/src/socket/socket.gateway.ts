import { Server, Socket } from 'socket.io';
import * as _ from 'lodash';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { UnauthorizedException, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { TokenService } from '../services/token.service';
import { UserDto, SocketEventsEnum } from '@boilerplate/shared';
import { UserToControllerHasAccessService } from '../services/user-to-controller-has-access.service';

@WebSocketGateway({ namespace: '/api', cors: true })
export class SocketGateway {
	@WebSocketServer()
	private server: Server;
	private readonly userRoomPrefix = 'user';
	private readonly controllerRoomPrefix = 'controller';

	constructor(
		private readonly tokenService: TokenService,
		private readonly userToControllerHasAccessService: UserToControllerHasAccessService,
		@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
	) {}

	public emitControllerDataToUser(id: string, controller: any) {
		const controllerRoom = this.generateControllerRoom(id);

		this.logger.info(`${controllerRoom}`);

		this.server.to(controllerRoom).emit(`${SocketEventsEnum.NewValues}_${id}`, controller);
	}

	public async handleConnection(@ConnectedSocket() client: Socket) {
		try {
			const token = <string>client.handshake.query.token;
			const user = await this.tokenService.verifyToken(token);

			this.logger.info(`User with id ${user.id} is connected`);

			client.data.user = user;
			const userRoom = this.generateUserRoom(user.id);
			client.join(userRoom);
		} catch (error) {
			this.logger.error('User disconnected', error.stack);
			client.disconnect();
		}
	}

	@SubscribeMessage(SocketEventsEnum.JoinController)
	async onClientJoinController(@MessageBody('id') id: string, @ConnectedSocket() client: Socket): Promise<void> {
		const user = SocketGateway.getUser(client);

		const isJoined = await this.userToControllerHasAccessService.checkUserHasAccessToController(user.id, id);

		if (!isJoined) {
			return;
		}

		const controllerRoom = this.generateControllerRoom(id);
		client.join(controllerRoom);

		this.logger.info(`User with id ${user.id} is joined to room ${controllerRoom}`);
	}

	@SubscribeMessage(SocketEventsEnum.LeftController)
	async onClientLeftController(@MessageBody('id') id: string, @ConnectedSocket() client: Socket): Promise<void> {
		const controllerRoom = this.generateControllerRoom(id);
		client.leave(controllerRoom);

		this.logger.warn(`User is leaved room ${controllerRoom}`);
	}

	private generateUserRoom = (id: string) => `${this.userRoomPrefix}_${id}`;

	private generateControllerRoom = (id: string) => `${this.controllerRoomPrefix}_${id}`;

	private static getUser(client: Socket): UserDto {
		const user = client.data.user;

		if (!user) {
			throw new UnauthorizedException('You have not rights');
		}

		return user;
	}
}
