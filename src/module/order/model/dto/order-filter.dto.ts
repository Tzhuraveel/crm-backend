import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  Validate,
} from 'class-validator';
import { DateTime } from 'luxon';

import { EnumTransformValidator } from '../../../../core/validation/decorator';
import { PageOptionsDto } from '../../../page/model/dto';
import {
  ECourse,
  ECourseFormat,
  ECourseType,
  EManagerTrue,
  EStatus,
} from '../enum';

export class QueryDto extends PageOptionsDto {
  @ApiPropertyOptional({ example: 1, minimum: 1 })
  @Transform(({ value }) => +value)
  @Min(1)
  @IsOptional()
  @IsInt()
  id?;

  @ApiPropertyOptional({
    example: true,
    description: 'show orders that belong to the manager',
  })
  @Validate(EnumTransformValidator, [EManagerTrue])
  @IsOptional()
  manager?: true;

  @ApiProperty({
    example: '2023-08-23',
    required: false,
    description:
      'here you specify the date from which the search should be done',
  })
  @Transform(({ value }) => {
    return DateTime.fromISO(value, { zone: 'UTC' }).toJSDate();
  })
  @IsDate()
  @IsOptional()
  start_course?: Date;

  @ApiProperty({
    example: '2023-08-23',
    required: false,
    description: 'here you specify the date by which the search should be done',
  })
  @Transform(({ value }) => {
    return DateTime.fromISO(value, { zone: 'UTC' }).toJSDate();
  })
  @IsDate()
  @IsOptional()
  end_course?: Date;

  @ApiPropertyOptional({
    type: String,
    example: 'Timofii',
    minLength: 1,
    maxLength: 20,
  })
  @Length(1, 20)
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Zhuravel',
    minLength: 1,
    maxLength: 20,
  })
  @Length(1, 20)
  @IsOptional()
  surname?: string;

  @ApiPropertyOptional({
    type: Number,
    example: 24,
    minimum: 1,
    maxLength: 120,
  })
  @Transform(({ value }) => +value)
  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(120)
  age?: number;

  @ApiPropertyOptional({
    type: String,
    example: 'user@gmail.com',
    minLength: 1,
    maxLength: 100,
  })
  @Length(1, 100)
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ enum: ECourseType, example: ECourseType.PRO })
  @IsEnum(ECourseType)
  @IsOptional()
  course_type?: ECourseType;

  @ApiPropertyOptional({
    enum: ECourseFormat,
    example: ECourseFormat.STATIC,
  })
  @IsEnum(ECourseFormat)
  @IsOptional()
  course_format?: ECourseFormat;

  @ApiPropertyOptional({ enum: ECourse, example: ECourse.FS })
  @IsEnum(ECourse)
  @IsOptional()
  course?: ECourse;

  @ApiPropertyOptional({ enum: EStatus, example: EStatus.WORK })
  @IsEnum(EStatus)
  @IsOptional()
  status?: EStatus;

  @ApiPropertyOptional({ type: Number, example: 2, minimum: 1 })
  @Transform(({ value }) => +value)
  @Min(1)
  @IsInt()
  @IsOptional()
  group?: number;

  @ApiPropertyOptional({
    type: String,
    example: '+380932434432',
    minLength: 1,
    maxLength: 20,
  })
  @IsOptional()
  @Length(1, 20)
  @IsString()
  phone?: string;
}
