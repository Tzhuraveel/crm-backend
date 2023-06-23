import { ApiProperty } from '@nestjs/swagger';

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
  created_at: Date;

  @ApiProperty({ type: () => UserBriefResponseDto })
  manager: UserBriefResponseDto;
}
