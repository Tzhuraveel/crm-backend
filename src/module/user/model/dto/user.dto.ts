import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { DateTime } from 'luxon';

import { PageOptionsDto, PageResponseDto } from '../../../page/model/dto';
import { EUserRole } from '../enum';

export class UserQueryDto extends PageOptionsDto {
  @ApiPropertyOptional({
    type: String,
    example: 'timofii',
    minLength: 1,
    maxLength: 30,
  })
  @Length(1, 30)
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'user@gmail.com',
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'zhuravel',
    minLength: 1,
    maxLength: 30,
  })
  @Length(1, 30)
  @IsString()
  @IsOptional()
  surname?: string;

  @ApiPropertyOptional({
    example: '2023-08-23',
    description:
      'here you specify the date from which the search should be done',
  })
  @Transform(({ value }) => {
    return DateTime.fromISO(value, { zone: 'UTC' }).toJSDate();
  })
  @IsDate()
  @IsOptional()
  start_login?: Date;

  @ApiPropertyOptional({
    example: '2023-08-23',
    description: 'here you specify the date by which the search should be done',
  })
  @Transform(({ value }) => {
    return DateTime.fromISO(value, { zone: 'UTC' }).toJSDate();
  })
  @IsDate()
  @IsOptional()
  end_login?: Date;
}

export class UserResponseDto {
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({ type: String, example: 'Timofii' })
  name: string;

  @ApiProperty({ type: String, example: 'Zhuravel' })
  surname: string;

  @ApiProperty({ type: String, example: 'user@gmail.com' })
  email: string;

  @ApiProperty({ type: Boolean, example: true })
  is_active: boolean;

  @ApiProperty({ type: Date, example: true })
  last_login: Date;

  @ApiProperty({ enum: EUserRole, example: EUserRole.ADMIN })
  role: EUserRole;
}

export class UsersResponseDto extends PageResponseDto {
  @ApiProperty({ type: [UserResponseDto] })
  @ValidateNested()
  @Type(() => UserResponseDto)
  data: UserResponseDto[];
}
