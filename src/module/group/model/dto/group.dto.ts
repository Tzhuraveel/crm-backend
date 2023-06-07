import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GroupDto {
  @ApiProperty({ required: true, type: String, example: 'march-2023' })
  @IsNotEmpty()
  @Length(3, 100)
  @IsString()
  name: string;
}
