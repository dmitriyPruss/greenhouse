import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
	return (object: Record<any, any>, propertyName: string): void => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [property],
			validator: MatchConstraint,
		});
	};
}

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
	public validate(value: Record<any, any>, args: ValidationArguments): boolean {
		const [relatedPropertyName] = args.constraints;
		const relatedValue = (args.object as any)[relatedPropertyName];

		return value === relatedValue;
	}
}
