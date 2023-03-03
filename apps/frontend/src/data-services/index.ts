import httpClientFactory from './http-client.factory';
import configService from '../config/config.service';
import UsersService from './users.service';
import AccessesService from './accesses.service';
import AuthService from './auth.service';
import ControllersService from './controllers.service';

export const httpClient = httpClientFactory(configService);

export const usersService = new UsersService(httpClient);
export const accessesService = new AccessesService(httpClient);
export const authService = new AuthService(httpClient);
export const controllersService = new ControllersService(httpClient);
