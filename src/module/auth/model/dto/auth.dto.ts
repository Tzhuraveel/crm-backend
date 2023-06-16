import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Validate,
  ValidateNested,
} from 'class-validator';

import { regexExpression } from '../../../../core/constant/regex';
import { TrimDecorator } from '../../../../core/validation/decorator';
import { UserResponseDto } from '../../../user/model/dto';

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

export class ActivateDto {
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
  @Length(2, 40)
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Zhuravel',
    minLength: 2,
    maxLength: 40,
  })
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

export class ActionTokenResponseDto {
  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4NTYzNzA4OCwiZXhwIjoxNjg1NjQwNjg4fQ.ivFlUGcmNDB5SErHqkGG6DM1ig6Hj4hYnk11PWcQ-Ls',
  })
  actionToken: string;
}

export class TokenResponseDto {
  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4NTYzNzA4OCwiZXhwIjoxNjg1NjQwNjg4fQ.ivFlUGcmNDB5SErHqkGG6DM1ig6Hj4hYnk11PWcQ-Ls',
  })
  accessToken: string;

  @ApiProperty({
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4NTYzNzA4OCwiZXhwIjoxNjg1NjQwNjg4fQ.ivFlUGcmNDB5SErHqkGG6DM1ig6Hj4hYnk11PWcQ-Ls',
  })
  refreshToken: string;
}

export class AccessResponseDto extends TokenResponseDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => UserResponseDto)
  manager: UserResponseDto;
}
