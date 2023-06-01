import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../../core/database/entities';
import { EDbField, EDynamicallyAction } from '../../core/enum/dynamic.enum';
import { ITokenPair } from '../../core/interface';
import { PasswordService } from '../../core/service';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  public async checkIsUserExist(
    actionWithFoundField: EDynamicallyAction,
    field: string,
    dbField: EDbField,
  ): Promise<User> {
    const foundItem = await this.authRepository.findByUniqueField(
      field,
      dbField,
    );

    switch (actionWithFoundField) {
      case EDynamicallyAction.NEXT:
        if (!foundItem) {
          throw new HttpException('User not found', 400);
        }
        return foundItem;
      case EDynamicallyAction.THROW:
        if (foundItem) {
          throw new HttpException('User already exist', 400);
        }
        break;
    }
  }

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly password: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(credentials: LoginDto): Promise<ITokenPair> {
    const userFromDb = await this.checkIsUserExist(
      EDynamicallyAction.NEXT,
      credentials.email,
      EDbField.EMAIL,
    );

    await this.password.compare(credentials.password, userFromDb.password);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({
        userId: userFromDb.id,
        role: userFromDb.role,
      }),
      this.jwtService.signAsync(
        { userId: userFromDb.id, role: userFromDb.role },
        { expiresIn: '15d' },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
