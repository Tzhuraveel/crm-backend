import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Length, ValidateNested } from 'class-validator';

import { UserResponseDto } from '../../../user/model/dto';

export class CommentDto {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  @Length(5, 100)
  comment: string;
}

export class ManagerDto extends OmitType(UserResponseDto, [
  'email',
  'role',
] as const) {}

export class CommentResponseDto {
  @ApiProperty({ required: true, type: Number, example: 2 })
  id: number;

  @ApiProperty({ required: true, type: String, example: 'helloWorld' })
  comment: string;

  @ApiProperty({
    required: true,
    type: Date,
    example: '2023-06-07T09:11:44.612Z',
  })
  createdAt: Date;

  @ApiProperty()
  @ValidateNested()
  @Type(() => ManagerDto)
  manager: ManagerDto;
}
