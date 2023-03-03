import { Socket, io } from 'socket.io-client';
import { ConfigService } from '../config/config.service';
import { IConfigParams } from '../interfaces/config-params';
import { SocketEventsEnum } from '@boilerplate/shared';

export default class SocketClient {
	private socket: Socket | null;
	private readonly baseUrl: string;

	constructor(private readonly configService: ConfigService<IConfigParams>) {
		this.baseUrl = this.configService.get('NX_APP_API_URL')!;
	}

	public connect(token: string) {
		if (!token || !this.baseUrl) {
			return;
		}

		if (this.socket) {
			this.disconnect();
		}

		this.socket = io(this.baseUrl, {
			query: { token },
			transports: ['websocket', 'polling'],
			reconnection: true,
			reconnectionDelay: 3000,
		});

		this.socket.connect();
		console.log('connect');
	}

	public disconnect() {
		if (this.socket?.active) {
			this.socket.disconnect();
		}

		this.socket = null;
		console.log('disconnect');
	}

	public joinController(id: string) {
		this.socket?.emit(SocketEventsEnum.JoinController, { id });
		console.log('Join controller');
	}

	public leftController(id: string) {
		this.socket?.emit(SocketEventsEnum.LeftController, { id });
		console.log('Left controller');
	}

	public subscribeOnNewValues(controllerId: string, handler: (data: any) => any): void {
		this.socket?.on(`${SocketEventsEnum.NewValues}_${controllerId}`, handler);
		console.log('Subscribe controller');
	}

	public unsubscribeOnNewValues(controllerId: string): void {
		this.socket?.off(`${SocketEventsEnum.NewValues}_${controllerId}`);
		console.log('unsubscribe!');
	}
}
