import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { User } from '../../core/database/entities';
import { EDbField, EDynamicallyAction } from '../../core/enum';
import { TokenService } from '../token';
import { ITokenPair } from '../token/model/interface';
import { UserRepository } from '../user/user.repository';
import { LoginDto } from './model/dto';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly password: PasswordService,
  ) {}
  public async checkIsUserExist(
    actionWithFoundField: EDynamicallyAction,
    field: string | number,
    dbField: EDbField,
  ): Promise<User> {
    const foundItem = await this.userRepository.findByUniqueField(
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

  public async login(credentials: LoginDto): Promise<ITokenPair> {
    const userFromDb = await this.checkIsUserExist(
      EDynamicallyAction.NEXT,
      credentials.email,
      EDbField.EMAIL,
    );

    await this.password.compare(credentials.password, userFromDb.password);

    return await this.tokenService.createTokenPair({
      userId: userFromDb.id,
      role: userFromDb.role,
    });
  }

  public async refresh(token): Promise<ITokenPair> {
    if (!token) {
      throw new HttpException('No token', HttpStatus.BAD_REQUEST);
    }

    await this.tokenService.verifyToken(token);

    const tokenFromDb = await this.tokenService.findByToken(token);

    if (!tokenFromDb) {
      throw new HttpException(
        'Token deleted or expired',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userFromDb = await this.checkIsUserExist(
      EDynamicallyAction.NEXT,
      tokenFromDb.userId,
      EDbField.ID,
    );

    return await this.tokenService.createTokenPair({
      userId: userFromDb.id,
      role: userFromDb.role,
    });
  }
}
