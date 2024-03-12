import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LessThan } from 'typeorm';

import { AppConfigService } from '../../config/app';
import { ActionToken, Token } from '../../core/database/entities';
import { ActionTokenRepository } from './action-token.repository';
import { EActionToken } from './model/enum';
import { ITokenPair, ITokenPayload } from './model/interface';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenRepository: TokenRepository,
    private readonly actionTokenRepository: ActionTokenRepository,
    private readonly appConfigService: AppConfigService,
  ) {}

  public async verifyAuthToken(token): Promise<ITokenPayload> {
    const payload: ITokenPayload = await this.jwtService.verifyAsync(token);

    if (!payload)
      throw new HttpException('Token not valid', HttpStatus.BAD_REQUEST);

    return payload;
  }

  public async verifyActionToken(
    token,
    typeToken: EActionToken,
  ): Promise<ITokenPayload> {
    let secret;

    switch (typeToken) {
      case EActionToken.ACTIVATE:
        secret = this.appConfigService.secretActivateToken;
        break;
      case EActionToken.FORGOT:
        secret = this.appConfigService.secretForgotToken;
        break;
    }

    const payload: ITokenPayload = (await this.jwtService.verifyAsync(token, {
      secret,
    })) as ITokenPayload;

    if (!payload)
      throw new HttpException('Token not valid', HttpStatus.BAD_REQUEST);

    return payload;
  }

  public async createTokenPair(payload: ITokenPayload): Promise<ITokenPair> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, { expiresIn: '20m' }),
    ]);

    await this.tokenRepository.save({
      accessToken,
      refreshToken,
      userId: payload.userId,
    });

    return { accessToken, refreshToken };
  }

  public async getActivateToken(payload: ITokenPayload): Promise<string> {
    const activateToken = await this.jwtService.signAsync(payload, {
      secret: this.appConfigService.secretActivateToken,
      expiresIn: '10m',
    });

    await this.actionTokenRepository.save({
      typeToken: EActionToken.ACTIVATE,
      userId: payload.userId,
      actionToken: activateToken,
    });

    return activateToken;
  }

  public async getForgotToken(payload: ITokenPayload): Promise<string> {
    const forgotToken = await this.jwtService.signAsync(payload, {
      secret: this.appConfigService.secretForgotToken,
      expiresIn: '10m',
    });

    await this.actionTokenRepository.save({
      typeToken: EActionToken.FORGOT,
      userId: payload.userId,
      actionToken: forgotToken,
    });

    return forgotToken;
  }

  public async findByRefreshToken(token: string): Promise<Token> {
    return await this.tokenRepository.findOne({
      where: { refreshToken: token },
    });
  }

  public async findByAccessToken(token: string): Promise<Token> {
    return await this.tokenRepository.findOne({
      where: { accessToken: token },
    });
  }

  public async deleteManyTokenByDate(createdAt: Date) {
    await this.tokenRepository.delete({
      created_at: LessThan(createdAt),
    });
  }

  public async deleteByRefreshToken(token: string) {
    await this.tokenRepository.delete({ refreshToken: token });
  }

  public async findByActionToken(
    token,
    typeToken: EActionToken,
  ): Promise<ActionToken> {
    const actionTokenFromDb = await this.actionTokenRepository.findOne({
      where: { actionToken: token, typeToken },
    });

    if (!actionTokenFromDb)
      throw new NotFoundException('Token deleted or expired');

    return actionTokenFromDb;
  }

  public async deleteManyActionTokenByDate(createdAt) {
    await this.actionTokenRepository.delete({
      created_at: LessThan(createdAt),
    });
  }

  public async deleteActionToken(actionToken) {
    await this.actionTokenRepository.delete({ actionToken });
  }
}
