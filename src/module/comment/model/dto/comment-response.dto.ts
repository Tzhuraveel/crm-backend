import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { UserBriefResponseDto } from '../../../user/model/dto';

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

  @ApiProperty({ type: UserBriefResponseDto })
  @ValidateNested()
  @Type(() => UserBriefResponseDto)
  manager: UserBriefResponseDto;
}
