import { AxiosInstance, AxiosResponse } from 'axios';
import { AccessKeyFilter, KeyDto } from '@boilerplate/shared';

class AccessesService {
	private readonly accessRoute = 'accesses';

	constructor(private readonly httpClient: AxiosInstance) {}

	public async setAccess(key: string): Promise<AxiosResponse<KeyDto>> {
		return await this.httpClient.post<KeyDto>(`${this.accessRoute}`, { key });
	}
}

export default AccessesService;
