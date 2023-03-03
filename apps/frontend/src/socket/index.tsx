import SocketClient from './client.socket';
import configService from '../config/config.service';

export const socketClient = new SocketClient(configService);
