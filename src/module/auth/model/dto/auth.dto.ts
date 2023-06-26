import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';

import { regexExpression } from '../../../../core/constant/regex';
import { TrimDecorator } from '../../../../core/validation/decorator';

export class LoginDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'user@gmail.com',
    pattern: `${regexExpression.EMAIL}`,
  })
  @Matches(regexExpression.EMAIL)
  @IsNotEmpty()
  @IsString()
  @Validate(TrimDecorator)
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    example: '234Fsfe3#',
    minimum: 5,
    maximum: 20,
  })
  @IsNotEmpty()
  @Length(5, 20)
  @IsString()
  @Validate(TrimDecorator)
  password: string;
}

export class PasswordDto {
  @ApiProperty({
    required: true,
    pattern: `${regexExpression.PASSWORD}`,
    example: '234Fsfe3#',
  })
  @Matches(regexExpression.PASSWORD)
  @IsNotEmpty()
  @Length(5, 20)
  @IsString()
  @Validate(TrimDecorator)
  password: string;
}

export class RegisterDto {
  @ApiProperty({
    type: String,
    example: 'Timofii',
    minLength: 2,
    maxLength: 40,
  })
  @IsAlpha()
  @Length(2, 40)
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Zhuravel',
    minLength: 2,
    maxLength: 40,
  })
  @IsAlpha()
  @Length(2, 40)
  @IsString()
  surname: string;

  @ApiProperty({
    required: false,
    type: String,
    example: 'user@gmail.com',
    pattern: `${regexExpression.EMAIL}`,
  })
  @Validate(TrimDecorator)
  @Matches(regexExpression.EMAIL)
  @IsOptional()
  email: string;
}
