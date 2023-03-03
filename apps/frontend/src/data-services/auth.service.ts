import { AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, AuthPayloadDto, RefreshTokenDto } from '@boilerplate/shared';

class AuthService {
	private readonly authRoute = 'auth';

	constructor(private readonly httpClient: AxiosInstance) {}

	public async login(body: LoginDto): Promise<AxiosResponse<AuthPayloadDto>> {
		return await this.httpClient.post<AuthPayloadDto>(`${this.authRoute}/login`, body);
	}

	public async logOut(refreshToken: string): Promise<void> {
		this.httpClient.delete<string>(`${this.authRoute}/logout/${refreshToken}`);
	}

	public async refresh(tokenData: RefreshTokenDto): Promise<AxiosResponse<AuthPayloadDto>> {
		return await this.httpClient.post<AuthPayloadDto>(`${this.authRoute}/refresh`, tokenData);
	}
}

export default AuthService;
