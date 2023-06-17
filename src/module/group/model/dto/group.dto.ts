import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class GroupDto {
  @ApiProperty({
    type: String,
    example: 'march-2023',
    minLength: 3,
    maxLength: 30,
  })
  @IsNotEmpty()
  @Length(3, 30)
  @IsString()
  name: string;
}
