import { Injectable } from '@nestjs/common';

import { User } from '../../core/database/entities';
import { UserResponseDto } from './model/dto';

@Injectable()
export class UserMapper {
  public toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      surname: user.surname,
      role: user.role,
      is_banned: user.is_banned,
      last_login: user.last_login,
      is_active: user.is_active,
    };
  }

  public toManyResponse(users): UserResponseDto[] {
    return users.map(this.toResponse);
  }
}
