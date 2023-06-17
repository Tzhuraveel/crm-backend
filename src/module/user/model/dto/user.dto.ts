import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString, Length } from 'class-validator';
import { DateTime } from 'luxon';

import { PageOptionsDto } from '../../../page/model/dto';

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
