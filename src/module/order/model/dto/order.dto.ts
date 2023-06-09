import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { DateTime } from 'luxon';

import { regexExpression } from '../../../../core/constant/regex';
import {
  ECourse,
  ECourseFormat,
  ECourseType,
  EStatus,
} from '../enum/course.enum';

export class AbstractOrderDto {
  @ApiProperty({ required: false, type: String, example: 'Timofii' })
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false, type: String, example: 'Zhuravel' })
  @IsOptional()
  surname?: string;

  @ApiProperty({ required: false, type: Number, example: 24 })
  @IsOptional()
  @Min(0)
  @Max(120)
  @Transform(({ value }) => +value)
  age?: number;

  @ApiProperty({
    required: false,
    type: String,
    example: 'user@gmail.com',
    pattern: `${regexExpression.EMAIL}`,
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @Matches(regexExpression.EMAIL)
  email?: string;

  @ApiProperty({ required: false, enum: ECourseType, example: ECourseType.PRO })
  @IsEnum(ECourseType)
  @IsOptional()
  course_type?: ECourseType;

  @ApiProperty({
    required: false,
    enum: ECourseFormat,
    example: ECourseFormat.STATIC,
  })
  @IsEnum(ECourseFormat)
  @IsOptional()
  course_format?: ECourseFormat;

  @ApiProperty({ required: false, enum: ECourse, example: ECourse.FS })
  @IsEnum(ECourse)
  @IsOptional()
  course?: ECourse;

  @ApiProperty({ required: false, enum: EStatus, example: EStatus.WORK })
  @IsEnum(EStatus)
  @IsOptional()
  status?: EStatus;

  @ApiProperty({ required: false, type: Number, example: 2 })
  @Transform(({ value }) => +value)
  @IsInt()
  @IsOptional()
  group?: number;

  @ApiProperty({ required: false, type: String, example: '+380932434432' })
  @IsOptional()
  phone?: string;
}

export class QueryDto extends AbstractOrderDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @Transform(({ value }) => +value)
  page? = 1;

  @ApiProperty({
    example: 'email',
    required: false,
    description:
      'If you want to sort from largest to smallest, then' +
      ' you need to put "-" in front of the property. If you want sort from smallest to largest, you only need to' +
      ' send the property',
  })
  @IsOptional()
  sort?: string;

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
}

export class OrderDto extends AbstractOrderDto {
  @ApiProperty({ required: false, type: Number, example: 10000 })
  @IsOptional()
  sum?: number;

  @ApiProperty({ required: false, type: Number, example: 6000 })
  @IsOptional()
  alreadyPaid?: number;
}

export class OrderResponseDto {
  @ApiProperty({ example: 1, type: Number })
  page: number;

  @ApiProperty({ example: true, type: Boolean })
  perPage: boolean;

  @ApiProperty({ example: true, type: Boolean })
  nextPage: boolean;

  @ApiProperty({ example: 25, type: Number })
  itemsCount: number;

  @ApiProperty({ example: 500, type: Number })
  totalCount: number;

  @ApiProperty({ example: 20, type: Number })
  pageCount: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => OrderDto)
  orderDto: OrderDto;
}
