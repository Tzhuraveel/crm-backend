import { ApiProperty, PickType } from '@nestjs/swagger';

import { OrderStatisticsResponseDto } from '../../../order/model/dto';
import { PageResponseDto } from '../../../page/model/dto';
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

  @ApiProperty({ type: Boolean, example: true })
  is_active: boolean;

  @ApiProperty({ type: Date, example: '2023-06-05 12:40:13.133668' })
  last_login: Date;

  @ApiProperty({ type: Boolean, example: true })
  is_banned: boolean;

  @ApiProperty({ enum: EUserRole, example: EUserRole.ADMIN })
  role: EUserRole;
}

export class UserBriefResponseDto extends PickType(UserResponseDto, [
  'id',
  'name',
  'surname',
]) {}

export class UserStatisticsResponseDto extends UserResponseDto {
  @ApiProperty({ type: () => OrderStatisticsResponseDto })
  statistics: OrderStatisticsResponseDto;
}

export class UsersResponseDto extends PageResponseDto {
  @ApiProperty({ type: [UserStatisticsResponseDto] })
  data: UserStatisticsResponseDto[];
}
