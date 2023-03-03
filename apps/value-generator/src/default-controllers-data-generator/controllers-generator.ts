import axios from 'axios';
import { controllersData } from './controllers-data';

export class ControllersGenerator {
	private defaultControllers: any[] = controllersData;
	private accessToken: string = '';

	public getTokens = async () => {
		try {
			return await axios.post('http://localhost:3000/api/auth/login', {
				email: 'rtyuara@gmail.com',
				password: 'rtyuara@45RT#',
			});
		} catch (error) {
			console.error(error);
		}
	};

	public setToken = (accessToken: string): void => {
		axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
	};

	private createNewController = async (controller: any): Promise<void> => {
		await axios.post('http://localhost:3000/api/controllers/new_controller', controller);
	};

	public runGenerator = async (): Promise<void> => {
		const response = await this.getTokens();

		this.accessToken = response.data.accessToken;

		this.setToken(this.accessToken);

		if (this.defaultControllers.length) {
			for (const controller of this.defaultControllers) {
				await this.createNewController(controller);
			}
		}
	};
}
