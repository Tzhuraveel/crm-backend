import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';

import { regexExpression } from '../../../../core/constant/regex';
import { ECourse, ECourseFormat, ECourseType, EStatus } from '../enum';

export class OrderUpdateDto {
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
    pattern: `${regexExpression.EMAIL}`,
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @Matches(regexExpression.EMAIL)
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

  @ApiPropertyOptional({ type: Number, example: 10000, minimum: 1 })
  @Transform(({ value }) => +value)
  @Min(1)
  @IsNumber()
  @IsOptional()
  sum?: number;

  @ApiPropertyOptional({ type: Number, example: 6000, minimum: 1 })
  @Transform(({ value }) => +value)
  @Min(1)
  @IsNumber()
  @IsOptional()
  alreadyPaid?: number;
}
