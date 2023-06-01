import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

import { regexExpression } from '../../../core/regex';

export class LoginDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'zhuraveltimofiy2003@gmail.com',
    pattern: `${regexExpression.EMAIL}`,
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @Matches(regexExpression.EMAIL)
  email: string;
}
