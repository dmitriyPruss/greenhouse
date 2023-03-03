import { AxiosInstance, AxiosResponse } from 'axios';
import { ControllerFilter, ControllerDto, ListWithTotals, KeyDto } from '@boilerplate/shared';

class ControllersService {
	private readonly controllerRoute = 'controllers';

	constructor(private readonly httpClient: AxiosInstance) {}

	public async getControllers(filters?: ControllerFilter): Promise<AxiosResponse<ListWithTotals<ControllerDto[]>>> {
		return await this.httpClient.get<ListWithTotals<ControllerDto[]>>(this.controllerRoute, { params: filters });
	}

	public async getController(id: string): Promise<AxiosResponse<ControllerDto>> {
		return await this.httpClient.get<ControllerDto>(`${this.controllerRoute}/${id}`);
	}

	public async getKeys(id: string, filters?: ControllerFilter): Promise<AxiosResponse<any>> {
		return await this.httpClient.get<any>(`${this.controllerRoute}/keys/${id}`, { params: filters });
	}

	public async getControllerWithValues(id: string): Promise<AxiosResponse<ControllerDto>> {
		return await this.httpClient.get<ControllerDto>(`${this.controllerRoute}/with_values/${id}`);
	}

	public async setSubscription(id: string, hardwareCode: string) {
		return await this.httpClient.get<any>(`${this.controllerRoute}/subscribe/${id}`, { params: { hardwareCode } });
	}

	public async createKey(body: { id: string; role: string }): Promise<AxiosResponse<KeyDto>> {
		return this.httpClient.post<KeyDto>(`${this.controllerRoute}/new_key/`, body);
	}

	public async createController(body: ControllerDto): Promise<AxiosResponse<ControllerDto>> {
		return this.httpClient.post<ControllerDto>(`${this.controllerRoute}/new_controller`, body);
	}

	public async updateController(id: string, body: ControllerDto): Promise<AxiosResponse<ControllerDto>> {
		return this.httpClient.patch<ControllerDto>(`${this.controllerRoute}/${id}`, body);
	}

	public async deleteController(id: string): Promise<AxiosResponse<ControllerDto>> {
		return this.httpClient.delete<ControllerDto>(`${this.controllerRoute}/${id}`);
	}

	public async deactivateKey(id: string, deactivated: boolean) {
		return await this.httpClient.patch<any>(`${this.controllerRoute}/deactivate/${id}`, { deactivated });
	}
}

export default ControllersService;
