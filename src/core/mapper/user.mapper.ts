import { Injectable } from '@nestjs/common';

import { UserResponseDto } from '../../module/user/model/dto';
import { User } from '../database/entities';

@Injectable()
export class UserMapper {
  public toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      surname: user.surname,
      role: user.role,
    };
  }

  public toManyResponse(users: User[]) {
    return users.map(this.toResponse);
  }
}
