import {
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

import { User } from '../../core/database/entities';
import { EDbField, EDynamicallyAction } from '../../core/enum';
import { NotFoundEntityException } from '../../core/exception';
import { TokenService } from '../token';
import { EActionToken } from '../token/model/enum';
import { ITokenPair, ITokenPayload } from '../token/model/interface';
import { ActionTokenService } from '../token/services/action-token.service';
import { UserResponseDto } from '../user/model/dto';
import { UserMapper } from '../user/user.mapper';
import { UserRepository } from '../user/user.repository';
import {
  AccessResponseDto,
  LoginDto,
  PasswordDto,
  RegisterDto,
} from './model/dto';
import { PasswordService } from './password.service';

dayjs.extend(utc);

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly actionTokenService: ActionTokenService,
    private readonly passwordService: PasswordService,
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  public async validateAuthToken(token): Promise<User> {
    const payload: ITokenPayload = await this.tokenService.verifyAuthToken(
      token,
    );

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
    const userFromDb = await this.userRepository.findOne({
      where: { email: credentials.email, is_active: true },
    });

    if (!userFromDb) throw new NotFoundEntityException('User');

    if (userFromDb.is_banned) {
      throw new ForbiddenException(
        'Your account is banned. Contact to admin to find out the reason your ban',
      );
    }

    await this.passwordService.compare(
      credentials.password,
      userFromDb.password,
    );

    const tokenPair: ITokenPair = await this.tokenService.createTokenPair({
      userId: userFromDb.id,
      role: userFromDb.role,
    });

    await this.userRepository.update(userFromDb.id, {
      last_login: dayjs().utc().toDate(),
    });

    return { ...tokenPair, manager: this.userFromMapper(userFromDb) };
  }

  public async getRefreshToken(token): Promise<ITokenPair> {
    const userFromDb = await this.validateAuthToken(token);

    const tokenFromDb = await this.tokenService.findByRefreshToken(token);

    if (!tokenFromDb) {
      throw new NotFoundException('Token deleted or expired');
    }

    const [createdNewTokenPair] = await Promise.all([
      await this.tokenService.createTokenPair({
        userId: userFromDb.id,
        role: userFromDb.role,
      }),
      await this.tokenService.deleteByRefreshToken(token),
    ]);

    return createdNewTokenPair;
  }

  public userFromMapper(manager: User): UserResponseDto {
    return this.userMapper.toResponse(manager);
  }

  public async createManager(userDate: RegisterDto): Promise<UserResponseDto> {
    await this.checkIsUserExist(
      EDynamicallyAction.THROW,
      userDate.email,
      EDbField.EMAIL,
    );

    const createdUser = await this.userRepository.createManager(userDate);

    return this.userFromMapper(createdUser);
  }

  public async getActivateToken(userId: number): Promise<string> {
    const userFromDb = await this.checkIsUserExist(
      EDynamicallyAction.NEXT,
      userId,
      EDbField.ID,
    );

    if (userFromDb.is_active)
      throw new ConflictException('User is already activated');

    return await this.actionTokenService.getActivateToken({
      userId,
      role: userFromDb.role,
    });
  }

  public async getForgotToken(userId: number): Promise<string> {
    const userFromDb = await this.checkIsUserExist(
      EDynamicallyAction.NEXT,
      userId,
      EDbField.ID,
    );

    return await this.actionTokenService.getForgotToken({
      userId,
      role: userFromDb.role,
    });
  }

  public async activateUser(
    token: string,
    userDate: PasswordDto,
  ): Promise<UserResponseDto> {
    await this.actionTokenService.verifyActionToken(
      token,
      EActionToken.ACTIVATE,
    );

    const { userId } = await this.actionTokenService.findByActionToken(
      token,
      EActionToken.ACTIVATE,
    );

    await this.checkIsUserExist(EDynamicallyAction.NEXT, userId, EDbField.ID);

    const hashedPassword: string = await this.passwordService.hash(
      userDate.password,
    );

    await Promise.all([
      this.userRepository.update(userId, {
        is_active: true,
        password: hashedPassword,
      }),
      this.actionTokenService.deleteActionToken(token),
    ]);

    const updatedUser: User = await this.userRepository.findOne({
      where: { id: userId },
    });

    return this.userMapper.toResponse(updatedUser);
  }

  public async recoveryPassword(
    token: string,
    userDate: PasswordDto,
  ): Promise<void> {
    await this.actionTokenService.verifyActionToken(token, EActionToken.FORGOT);

    const { userId } = await this.actionTokenService.findByActionToken(
      token,
      EActionToken.FORGOT,
    );

    await this.checkIsUserExist(EDynamicallyAction.NEXT, userId, EDbField.ID);

    const hashedPassword: string = await this.passwordService.hash(
      userDate.password,
    );

    await Promise.all([
      this.userRepository.update(userId, {
        password: hashedPassword,
      }),
      this.actionTokenService.deleteActionToken(token),
    ]);
  }
}
