import { ApiProperty } from '@nestjs/swagger';

import { EUserRole } from '../enum';

export class UserResponseDto {
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({ type: String, example: 'Timofii' })
  name: string;

  @ApiProperty({ type: String, example: 'Zhuravel' })
  surname: string;

  @ApiProperty({ type: String, example: 'user@gmail.com' })
  email: string;

  @ApiProperty({ enum: EUserRole, example: EUserRole.ADMIN })
  role: EUserRole;
}
