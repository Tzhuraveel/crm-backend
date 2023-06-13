import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'enumTransform', async: false })
export class EnumTransformValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [EnumClass] = args.constraints;
    const enumValues = Object.values(EnumClass);

    return enumValues.includes(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid value for ${args.property}`;
  }
}
