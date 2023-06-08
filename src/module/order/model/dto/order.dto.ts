import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { DateTime } from 'luxon';

import {
  ECourse,
  ECourseFormat,
  ECourseType,
  EStatus,
} from '../enum/course.enum';

export class QueryDto {
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

  @ApiProperty({ example: 'Jhon', required: false })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'Oleksi', required: false })
  @IsOptional()
  surname?: string;

  @ApiProperty({ example: 'max@gmail.com', required: false })
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '097924259601', required: false })
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: '30', required: false })
  @Min(0)
  @Max(120)
  @IsOptional()
  @Transform(({ value }) => +value)
  age?: number;

  @ApiProperty({
    example: ECourseFormat.ONLINE,
    required: false,
    enum: ECourseFormat,
  })
  @IsEnum(ECourseFormat)
  @IsOptional()
  course_format?: ECourseFormat;

  @ApiProperty({
    example: ECourseType.MINIMAL,
    required: false,
    enum: ECourseType,
  })
  @IsEnum(ECourseType)
  @IsOptional()
  course_type?: ECourseType;

  @ApiProperty({ example: ECourse.JCX, required: false, enum: ECourse })
  @IsEnum(ECourse)
  @IsOptional()
  course?: ECourse;

  @ApiProperty({ example: EStatus.WORK, required: false, enum: EStatus })
  @IsEnum(EStatus)
  @IsOptional()
  status?: EStatus;

  @ApiProperty({
    example: '2023-08-23',
    required: false,
    description: 'here you specify the date from which to search for an order',
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
    description: 'here you specify the date to which to search for an order',
  })
  @Transform(({ value }) => {
    return DateTime.fromISO(value, { zone: 'UTC' }).toJSDate();
  })
  @IsDate()
  @IsOptional()
  end_course?: Date;

  @ApiProperty({ required: true, type: Number, example: 2 })
  @Transform(({ value }) => +value)
  @IsInt()
  @IsOptional()
  group?: string;
}

export class OrderDto {
  @ApiProperty({ required: false, type: String, example: 'Timofii' })
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false, type: String, example: 'Zhuravel' })
  @IsOptional()
  surname?: string;

  @ApiProperty({ required: false, type: Number, example: 24 })
  @IsOptional()
  age?: number;

  @ApiProperty({
    required: false,
    type: String,
    example: 'helloworld@gmail.com',
  })
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false, type: Number, example: 10000 })
  @IsOptional()
  sum?: number;

  @ApiProperty({ required: false, type: Number, example: 6000 })
  @IsOptional()
  alreadyPaid?: number;

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

  @ApiProperty({ required: false, type: String, example: '+380932434432' })
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false, enum: ECourse, example: ECourse.FS })
  @IsEnum(ECourse)
  @IsOptional()
  course?: ECourse;

  @ApiProperty({ required: false, enum: EStatus, example: EStatus.WORK })
  @IsEnum(EStatus)
  @IsOptional()
  status?: EStatus;

  @ApiProperty({ required: true, type: Number, example: 2 })
  @Transform(({ value }) => +value)
  @IsInt()
  @IsOptional()
  group?: string;
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
