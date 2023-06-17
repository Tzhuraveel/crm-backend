import { ApiProperty } from '@nestjs/swagger';

import { GroupDto } from './group.dto';

export class GroupResponseDto extends GroupDto {
  @ApiProperty({ type: Number, example: '3' })
  id: number;
}
