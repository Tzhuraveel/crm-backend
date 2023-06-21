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
import { TokenService } from '../token';
import { EActionToken } from '../token/model/enum';
import { ITokenPair, ITokenPayload } from '../token/model/interface';
import { UserMapper } from '../user';
import { UserResponseDto } from '../user/model/dto';
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
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
    private readonly userMapper: UserMapper,
  ) {}

  public async validateAuthToken(token): Promise<User> {
    const payload = (await this.tokenService.verifyAuthToken(
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
    const userFromDb = await this.userRepository.findOne({
      where: { email: credentials.email, is_active: true },
    });

    if (!userFromDb) throw new NotFoundException('User not found');

    if (userFromDb.is_banned) {
      throw new ForbiddenException(
        'Your account is banned. Contact to admin to find out the reason your ban',
      );
    }

    await this.passwordService.compare(
      credentials.password,
      userFromDb.password,
    );

    const tokenPair = await this.tokenService.createTokenPair({
      userId: userFromDb.id,
      role: userFromDb.role,
    });

    await this.userRepository.update(userFromDb.id, {
      last_login: dayjs().utc().toDate(),
    });

    return { ...tokenPair, manager: this.userFromMapper(userFromDb) };
  }

  public async refresh(token): Promise<ITokenPair> {
    const userFromDb = await this.validateAuthToken(token);

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

  public async register(userDate: RegisterDto): Promise<UserResponseDto> {
    await this.checkIsUserExist(
      EDynamicallyAction.THROW,
      userDate.email,
      EDbField.EMAIL,
    );

    const createdUser = await this.userRepository.createUser(userDate);

    return this.userFromMapper(createdUser);
  }

  public async createActivateToken(userId: number): Promise<string> {
    const userFromDb = await this.checkIsUserExist(
      EDynamicallyAction.NEXT,
      userId,
      EDbField.ID,
    );

    if (userFromDb.is_active)
      throw new ConflictException('User is already activated');

    return await this.tokenService.createActivateToken({
      userId,
      role: userFromDb.role,
    });
  }

  public async createForgotToken(userId: number): Promise<string> {
    const userFromDb = await this.checkIsUserExist(
      EDynamicallyAction.NEXT,
      userId,
      EDbField.ID,
    );

    return await this.tokenService.createForgotToken({
      userId,
      role: userFromDb.role,
    });
  }

  public async activateUser(
    token: string,
    userDate: PasswordDto,
  ): Promise<UserResponseDto> {
    const { userId } = await this.tokenService.findByActionToken(
      token,
      EActionToken.ACTIVATE,
    );

    await this.tokenService.verifyActionToken(token, EActionToken.ACTIVATE);

    await this.checkIsUserExist(EDynamicallyAction.NEXT, userId, EDbField.ID);

    const hashedPassword = await this.passwordService.hash(userDate.password);

    await Promise.all([
      this.userRepository.update(userId, {
        is_active: true,
        password: hashedPassword,
      }),
      this.tokenService.deleteActionToken(token),
    ]);

    const updatedUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    return this.userMapper.toResponse(updatedUser);
  }

  public async recoveryPassword(
    token: string,
    userDate: PasswordDto,
  ): Promise<void> {
    const { userId } = await this.tokenService.findByActionToken(
      token,
      EActionToken.FORGOT,
    );

    await this.tokenService.verifyActionToken(token, EActionToken.FORGOT);

    await this.checkIsUserExist(EDynamicallyAction.NEXT, userId, EDbField.ID);

    const hashedPassword = await this.passwordService.hash(userDate.password);

    await Promise.all([
      this.userRepository.update(userId, {
        password: hashedPassword,
      }),
      this.tokenService.deleteActionToken(token),
    ]);
  }
}
