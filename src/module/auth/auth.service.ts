import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { User } from '../../core/database/entities';
import { EDbField, EDynamicallyAction } from '../../core/enum';
import { UserMapper } from '../../core/mapper';
import { TokenService } from '../token';
import { ITokenPair, ITokenPayload } from '../token/model/interface';
import { UserResponseDto } from '../user/model/dto';
import { UserRepository } from '../user/user.repository';
import { AccessResponseDto, LoginDto } from './model/dto';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
    private readonly userMapper: UserMapper,
  ) {}

  public async validateToken(token): Promise<User> {
    const payload = (await this.tokenService.verifyToken(
      token,
    )) as ITokenPayload;

    const user = await this.checkIsUserExist(
      EDynamicallyAction.NEXT,
      payload.userId,
      EDbField.ID,
    );

    if (!user) throw new UnauthorizedException();

    return user;
  }

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
        if (!foundItem) throw new NotFoundException('User not found');
        return foundItem;
      case EDynamicallyAction.THROW:
        if (foundItem) throw new HttpException('User already exist', 400);
        break;
    }
  }

  public async login(credentials: LoginDto): Promise<AccessResponseDto> {
    const userFromDb = await this.checkIsUserExist(
      EDynamicallyAction.NEXT,
      credentials.email,
      EDbField.EMAIL,
    );

    await this.passwordService.compare(
      credentials.password,
      userFromDb.password,
    );

    const tokenPair = await this.tokenService.createTokenPair({
      userId: userFromDb.id,
      role: userFromDb.role,
    });

    return { ...tokenPair, manager: this.userFromMapper(userFromDb) };
  }

  public async refresh(token): Promise<ITokenPair> {
    const userFromDb = await this.validateToken(token);

    const tokenFromDb = await this.tokenService.findByRefreshToken(token);

    if (!tokenFromDb) {
      throw new NotFoundException('Token deleted or expired');
    }

    return await this.tokenService.createTokenPair({
      userId: userFromDb.id,
      role: userFromDb.role,
    });
  }

  public userFromMapper(manager: User): UserResponseDto {
    return this.userMapper.toResponse(manager);
  }
}
