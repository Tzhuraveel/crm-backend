import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, ValidateNested } from 'class-validator';

import { regexExpression } from '../../../../core/constant/regex';
import { UserResponseDto } from '../../../user/model/dto';

export class LoginDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'user@gmail.com',
    pattern: `${regexExpression.EMAIL}`,
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @Matches(regexExpression.EMAIL)
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    example: '234Fsfe3#',
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  password: string;
}

export class RefreshResponseDto {
  @ApiProperty({
    required: true,
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4NTYzNzA4OCwiZXhwIjoxNjg1NjQwNjg4fQ.ivFlUGcmNDB5SErHqkGG6DM1ig6Hj4hYnk11PWcQ-Ls',
  })
  accessToken: string;

  @ApiProperty({
    required: true,
    type: String,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4NTYzNzA4OCwiZXhwIjoxNjg1NjQwNjg4fQ.ivFlUGcmNDB5SErHqkGG6DM1ig6Hj4hYnk11PWcQ-Ls',
  })
  refreshToken: string;
}

export class AccessResponseDto extends RefreshResponseDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => UserResponseDto)
  manager: UserResponseDto;
}
