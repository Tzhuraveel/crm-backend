import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { CommentResponseDto } from '../../../comment/model/dto';
import { GroupResponseDto } from '../../../group/model/dto';
import { PageResponseDto } from '../../../page/model/dto';
import { UserBriefResponseDto } from '../../../user/model/dto';
import { ECourse, ECourseFormat, ECourseType, EStatus } from '../enum';

export class OrdersResponseDto extends PageResponseDto {
  @ApiProperty({
    type: String,
    example: 'Timofii',
    minLength: 1,
    maxLength: 20,
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'Zhuravel',
  })
  surname?: string;

  @ApiProperty({
    type: Number,
    example: 24,
  })
  age?: number;

  @ApiProperty({
    type: String,
    example: 'user@gmail.com',
  })
  email?: string;

  @ApiProperty({ enum: ECourseType, example: ECourseType.PRO })
  course_type?: ECourseType;

  @ApiProperty({
    enum: ECourseFormat,
    example: ECourseFormat.STATIC,
  })
  course_format?: ECourseFormat;

  @ApiProperty({ enum: ECourse, example: ECourse.FS })
  course?: ECourse;

  @ApiProperty({ enum: EStatus, example: EStatus.WORK })
  status?: EStatus;

  @ApiProperty({
    type: String,
    example: '+380932434432',
  })
  phone?: string;

  @ApiProperty({ type: Number, example: 10000, minimum: 1 })
  sum?: number;

  @ApiProperty({ type: Number, example: 6000, minimum: 1 })
  alreadyPaid?: number;

  @ApiProperty({ type: () => UserBriefResponseDto })
  manager: UserBriefResponseDto;

  @ApiProperty({ type: GroupResponseDto })
  @ValidateNested()
  @Type(() => GroupResponseDto)
  group: GroupResponseDto;

  @ApiProperty({ type: [CommentResponseDto] })
  @ValidateNested()
  @Type(() => CommentResponseDto)
  comment: CommentResponseDto[];
}

class StatisticsDto {
  @ApiProperty({ type: String, example: 1 })
  count: string;

  @ApiProperty({ enum: EStatus, example: EStatus.AGREE })
  status: EStatus;
}

export class OrderStatisticsResponseDto {
  @ApiProperty({ type: Number, example: 500 })
  total: number;

  @ApiProperty({ type: [StatisticsDto] })
  statuses: StatisticsDto[];
}

export class OrderTotalStatisticsResponseDto extends OrderStatisticsResponseDto {
  @ApiProperty({ type: Number, example: 500 })
  totalSum: number;

  @ApiProperty({ type: Number, example: 500 })
  totalSumUSD: number;

  @ApiProperty({ type: Number, example: 500 })
  totalAlreadyPaid: number;

  @ApiProperty({ type: Number, example: 500 })
  totalAlreadyPaidUSD: number;
}
