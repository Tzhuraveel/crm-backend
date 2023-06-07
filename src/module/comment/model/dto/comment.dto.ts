import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Length, ValidateNested } from 'class-validator';

export class CommentDto {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  @Length(5, 100)
  comment: string;
}

export class ManagerDto {
  @ApiProperty({ required: true, type: Number, example: 1 })
  id: number;

  @ApiProperty({ required: true, type: String, example: 'Timofii' })
  name: string;

  @ApiProperty({ required: true, type: String, example: 'Zhuravel' })
  surname: string;
}

export class CommentResponseDto {
  @ApiProperty({ required: true, type: Number, example: 2 })
  id: number;

  @ApiProperty({ required: true, type: String, example: 'helloworld' })
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
