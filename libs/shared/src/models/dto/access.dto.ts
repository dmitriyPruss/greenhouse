import { ControllerDto, RoleDto } from './controller.dto';
import { UserDto } from './user.dto';

export class AccessDto {
	id?: string;
	userId: string;
	controllerId: string;
	roleId: string;
	controller?: ControllerDto;
	user?: UserDto;
	role?: RoleDto;
}

export class KeyAccessDto {
	id?: string;
	controllerId: string;
	roleId: string;
	key?: string;
	isDeactivated?: Date | null;
}
