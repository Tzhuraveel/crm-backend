import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'enumTransform', async: false })
export class TrimDecorator implements ValidatorConstraintInterface {
  validate(value: string): any {
    if (typeof value !== 'string') return false;

    return value.trim();
  }
}
