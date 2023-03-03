import {
	MinLength,
	MaxLength,
	IsNotEmpty,
	IsUUID,
	Matches,
	ValidateNested,
	ArrayMinSize,
	ArrayMaxSize,
	ArrayUnique,
	Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsUniqueEntities } from './is-unique-entities-validator';

export type role = 'ADMIN' | 'READONLY';

export class ControllerDto {
	id?: string;

	@Matches(/^[A-Z][a-z]+(-[A-Z][a-z]*)?$/, {
		message: 'Only Latin!',
	})
	@MinLength(2, { message: 'Name is too short or empty' })
	@MaxLength(25, {
		message: 'Name is too long',
	})
	name: string;

	@Matches(/^[A-Z][a-z]+(-[A-Z][a-z]*)?$/, {
		message: 'Only Latin!',
	})
	@MinLength(2, { message: 'Name is too short or empty' })
	@MaxLength(25, {
		message: 'Name is too long',
	})
	description: string;

	accessCode?: string;

	@ValidateNested({ each: true })
	@Type(() => IndexDto)
	@ArrayMinSize(1)
	@ArrayMaxSize(20)
	indexes: IndexDto[];

	keys: KeyDto[];

	createdAt?: Date;
	updatedAt?: Date;
}

export class RoleDto {
	id?: string;

	@IsNotEmpty()
	name: role;
}

export class IndexDto {
	id?: string;

	@Matches(/^[A-Z][a-z]+(-[A-Z][a-z]*)?$/, {
		message: 'Only Latin!',
	})
	@MinLength(2, { message: 'Name is short' })
	@MaxLength(25, {
		message: 'Name is too long',
	})
	name: string;

	@Type(() => ValueDto)
	values?: ValueDto[];

	@ValidateNested({ each: true })
	@ArrayMinSize(5, { message: 'Tolerances must contain at list 5 elements' })
	@ArrayMaxSize(5)
	@ArrayUnique((o) => o.label && o.startValue)
	@Validate(IsUniqueEntities, {
		message: 'Fields are not unique!',
	})
	@Type(() => ToleranceDto)
	tolerances: ToleranceDto[];

	type: TypeDto;

	createdAt?: Date;
	updatedAt?: Date;

	previousValue?: number;
	lastValue?: number;
}

export class TypeDto {
	@IsNotEmpty()
	unitOfMeasurement: string;

	@IsNotEmpty()
	name: string;
}

export class ToleranceDto {
	id?: string;

	@IsNotEmpty()
	dangerRate: string;

	@IsNotEmpty()
	color: string;

	@IsNotEmpty()
	@Matches(/^[0-9\.]+$/, {
		message: 'Wrong symbols!',
	})
	startValue: number;

	@IsNotEmpty()
	label: string;
}

export class ValueDto {
	id?: string;

	@IsNotEmpty()
	@Matches(/^[0-9\.]+$/, {
		message: 'Wrong symbols!',
	})
	value: number;

	@IsUUID()
	indexId?: string;

	createdAt?: Date;
}

export class KeyDto {
	@MinLength(10, { message: 'Key is short' })
	@MaxLength(10, {
		message: 'Key is too long',
	})
	key: string;

	roleId?: string;
	role?: RoleDto;
	controllerId?: string;
}

export class HardwareCodeDto {
	@MinLength(41, { message: 'Code is short' })
	@MaxLength(41, {
		message: 'Code is too long',
	})
	@Matches(/^[0-9a-z]+$/, {
		message: 'Wrong symbols!',
	})
	hardwareCode: string;
}
