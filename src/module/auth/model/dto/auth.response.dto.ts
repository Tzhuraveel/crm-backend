import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { UserResponseDto } from '../../../user/model/dto';

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
