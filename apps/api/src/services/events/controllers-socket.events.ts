import { Injectable } from '@nestjs/common';
import { SocketGateway } from '../../socket/socket.gateway';
import { OnEvent } from '@nestjs/event-emitter';
import { ControllersService } from '../controllers.service';
import { ControllerSocketEventsEnum } from '@boilerplate/shared';

@Injectable()
export class ControllersSocketEventsService {
	constructor(private readonly socketGateway: SocketGateway, private readonly controllersService: ControllersService) {}

	@OnEvent(ControllerSocketEventsEnum.NewValuesForIndexCreated)
	public async onValueCreated(id: string): Promise<void> {
		const controllerData = await this.controllersService.findByIdForSocket(id);

		this.socketGateway.emitControllerDataToUser(id, controllerData);
	}
}
