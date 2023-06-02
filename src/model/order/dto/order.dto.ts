import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class QueryDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @Transform(({ value }) => +value)
  page? = 1;

  @ApiProperty({ example: 'email', required: false })
  @IsOptional()
  order?: string;

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
  @IsOptional()
  @Transform(({ value }) => +value)
  age?: number;
}

export class OrderResponseDto {
  @ApiProperty()
  page: number;
  @ApiProperty()
  perPage: boolean;
  @ApiProperty()
  nextPage: boolean;
  @ApiProperty()
  itemsCount: number;
  @ApiProperty()
  totalCount: number;
  @ApiProperty()
  pageCount: number;
  @ApiProperty({
    type: Object,
    properties: {
      name: { type: 'string' },
      age: { type: 'string' },
      surname: { type: 'string' },
      email: { type: 'string' },
      id: { type: 'string' },
      createdAt: { type: 'string' },
      updatedAt: { type: 'string' },
      manager: { type: 'string' },
      course_type: { type: 'string' },
      course_format: { type: 'string' },
      alreadyPaid: { type: 'string' },
      group: { type: 'string' },
      course: { type: 'string' },
      msg: { type: 'string' },
      phone: { type: 'string' },
      status: { type: 'string' },
      sum: { type: 'string' },
      utm: { type: 'string' },
    },
  })
  data: {
    name: string;
    age: string;
    surname: string;
    email: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    manager: string;
    course_type: string;
    course_format: string;
    alreadyPaid: string;
    group: string;
    course: string;
    msg: string;
    phone: string;
    status: string;
    sum: string;
    utm: string;
  };
}
