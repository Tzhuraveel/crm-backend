import { Injectable } from '@nestjs/common';

import { UserResponseDto } from '../../module/user/model/dto';

@Injectable()
export class UserMapper {
  public toResponse(user): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      surname: user.surname,
      role: user.role,
      last_login: user.last_login,
      is_active: user.is_active,
    };
  }

  public toManyResponse(users): UserResponseDto[] {
    return users.map(this.toResponse);
  }
}
