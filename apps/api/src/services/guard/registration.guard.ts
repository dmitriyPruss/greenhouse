import { Injectable, ExecutionContext, CanActivate, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class RegistrationGuard implements CanActivate {
	constructor(private readonly authService: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const { email } = request.body;
		const { registration, error, message } = await this.authService.validateNewUser(email);

		if (error) {
			throw new UnauthorizedException(message);
		}

		return registration;
	}
}
