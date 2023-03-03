import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ConfigService } from '../config/config.service';
import { IConfigParams } from '../interfaces/config-params';
import { sessionStore } from './../stores';

const httpClientFactory = (configService: ConfigService<IConfigParams>): AxiosInstance => {
	const httpClient = axios.create({
		baseURL: configService.get('NX_APP_API_URL'),
		timeout: 30000,
		validateStatus: null,
	});

	const refreshTokenIfExpired = async (config: AxiosRequestConfig): Promise<void | boolean> => {
		const { accessTokenExpirationTime, refresh } = sessionStore;

		if (!accessTokenExpirationTime || config.url?.includes('auth')) {
			return;
		}

		if (Date.now() >= accessTokenExpirationTime * 1000) {
			await refresh();
		}
	};

	const authHeaderInterceptor = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
		await refreshTokenIfExpired(config);

		const tokenFromLocalStorage = sessionStore.currentAccessToken;

		if (tokenFromLocalStorage && config.headers) {
			config.headers['Authorization'] = `Bearer ${tokenFromLocalStorage}`;
		}

		return config;
	};

	const errorHandlingInterceptor = (response: AxiosResponse): AxiosResponse => {
		if (response.status >= 400) {
			const errText = response.data?.message || response.statusText;
			throw new Error(errText);
		}

		return response;
	};

	httpClient.interceptors.request.use(authHeaderInterceptor);

	httpClient.interceptors.response.use(errorHandlingInterceptor);

	return httpClient;
};

export default httpClientFactory;
