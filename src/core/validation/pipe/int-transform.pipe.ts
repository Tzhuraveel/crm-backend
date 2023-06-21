import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IntTransformPipe implements PipeTransform<string> {
  transform(value: string) {
    const transformedValue = parseInt(value);

    if (typeof transformedValue !== 'number') {
      throw new BadRequestException('Invalid params');
    }

    if (transformedValue < 1) {
      throw new BadRequestException('Invalid params');
    }

    return transformedValue;
  }
}
