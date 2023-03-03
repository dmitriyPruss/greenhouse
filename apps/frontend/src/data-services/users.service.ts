import { AxiosInstance, AxiosResponse } from 'axios';
import { RegistrationDto, UserDto, UserFilter, AuthPayloadDto } from '@boilerplate/shared';

class UsersService {
	private readonly userRoute = 'users';

	constructor(private readonly httpClient: AxiosInstance) {}

	public async getTestData(filters?: UserFilter): Promise<AxiosResponse<UserDto[]>> {
		return this.httpClient.get<UserDto[]>(this.userRoute, { params: filters });
	}

	public async getCurrentUser(): Promise<AxiosResponse<UserDto>> {
		return await this.httpClient.get<UserDto>(`${this.userRoute}/user`);
	}

	public async signUp(body: RegistrationDto): Promise<AxiosResponse<AuthPayloadDto>> {
		return this.httpClient.post<AuthPayloadDto>(`${this.userRoute}/signup`, body);
	}
}

export default UsersService;
