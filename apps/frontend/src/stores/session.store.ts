import { makeAutoObservable, toJS, action, observable, computed } from 'mobx';
import jwtDecode from 'jwt-decode';
import { UserDto, LoginDto, RegistrationDto } from '@boilerplate/shared';
import UsersService from '../data-services/users.service';
import AuthService from '../data-services/auth.service';

export class SessionStore {
	@observable private loading: boolean = false;
	@observable private accessToken: string | null = null;
	@observable private refreshToken: string | null = null;
	@observable.ref private registeredUser: UserDto | null = null;

	constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {
		makeAutoObservable(this);

		this.accessToken = localStorage.getItem('access_token');
		this.refreshToken = localStorage.getItem('refresh_token');
		this.loadUser();
	}

	// Loading
	@computed public get isLoading() {
		return this.loading;
	}

	@action public setIsLoading(value: boolean) {
		this.loading = value;
	}

	// Authentication
	@computed public get currentAccessToken(): string | null {
		return this.accessToken;
	}

	@computed public get currentRefreshToken(): string | null {
		return this.refreshToken;
	}

	@computed public get isAuthenticated() {
		return !!this.accessToken;
	}

	@computed public get accessTokenExpirationTime(): number | null {
		if (!this.currentAccessToken) {
			return null;
		}

		const decodedToken = jwtDecode(this.currentAccessToken);

		return (decodedToken as any).exp;
	}

	@action private clearToken = (): void => {
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');

		this.accessToken = null;
		this.refreshToken = null;
	};

	@action private readonly setToken = (token: string | null, refreshToken: string | null): void => {
		if (token && refreshToken) {
			localStorage.setItem('access_token', token);
			localStorage.setItem('refresh_token', refreshToken);

			this.accessToken = token;
			this.refreshToken = refreshToken;
		} else {
			this.clearToken();
		}
	};

	public refresh = async (): Promise<void> => {
		if (!this.refreshToken || !toJS(this.registeredUser)?.id) {
			return;
		}

		const refreshResponse = await this.authService.refresh({
			refreshToken: this.refreshToken as string,
			userId: toJS(this.registeredUser)?.id,
		});

		const { accessToken, refreshToken } = refreshResponse.data;

		this.setToken(accessToken, refreshToken);
	};

	public signUp = async (registrationData: RegistrationDto): Promise<void> => {
		const { data } = await this.usersService.signUp(registrationData);
		const { accessToken, refreshToken } = data;

		this.setToken(accessToken, refreshToken);
		await this.loadUser();
	};

	public login = async (loginData: LoginDto): Promise<void> => {
		const { data } = await this.authService.login(loginData);
		const { accessToken, refreshToken } = data;

		this.setToken(accessToken, refreshToken);
		await this.loadUser();
	};

	public logOut = async (): Promise<void> => {
		await this.authService.logOut(this.refreshToken as string);

		this.clearToken();
		this.registeredUser = null;
	};

	// Users
	@computed public get user(): UserDto | null {
		return this.registeredUser;
	}

	@action private setUser(data: UserDto | null): void {
		this.registeredUser = data;
	}

	public loadUser = async (): Promise<void> => {
		try {
			this.setIsLoading(true);

			if (this.accessToken) {
				const { data } = await this.usersService.getCurrentUser();

				this.setUser(data);
			}
		} catch (e) {
			this.setUser(null);
			this.clearToken();
		} finally {
			this.setIsLoading(false);
		}
	};
}
