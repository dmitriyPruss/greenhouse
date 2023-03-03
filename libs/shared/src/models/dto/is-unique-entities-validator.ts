import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { isValid } from '../../handlers/is-valid';

@ValidatorConstraint()
export class IsUniqueEntities implements ValidatorConstraintInterface {
	validate(name: any, args: ValidationArguments) {
		return isValid(args.value);
	}

	defaultMessage(args: ValidationArguments) {
		return 'Fields are not unique!';
	}
}
