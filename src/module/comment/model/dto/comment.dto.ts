import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CommentDto {
  @ApiProperty({ required: true, type: String, minLength: 5, maxLength: 100 })
  @IsNotEmpty()
  @IsString()
  @Length(5, 100)
  comment: string;
}
