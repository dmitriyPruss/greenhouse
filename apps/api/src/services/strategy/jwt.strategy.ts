import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserDto } from '@boilerplate/shared';
import { UsersService } from '../users.service';
import { jwtConstants } from '../../constants';

export interface AccessTokenPayload {
	sub: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly usersService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret,
			signOptions: {
				expiresIn: jwtConstants.expiresIn,
			},
		});
	}

	public async validate(payload: AccessTokenPayload): Promise<UserDto> {
		const { sub: id } = payload;

		const user = await this.usersService.findById(id);

		if (!user) {
			return null;
		}

		return user;
	}
}
