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
    const payload = (await this.jwtService.verifyAsync(token)) as ITokenPayload;

    if (!payload)
      throw new HttpException('Token not valid', HttpStatus.BAD_REQUEST);

    return payload;
  }

  public async verifyActionToken(token): Promise<ITokenPayload> {
    const payload = (await this.jwtService.verifyAsync(token, {
      secret: this.appConfigService.secretActionKey,
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

  public async createActivateToken(payload: ITokenPayload): Promise<string> {
    const activateToken = await this.jwtService.signAsync(payload, {
      secret: this.appConfigService.secretActionKey,
      expiresIn: '10m',
    });

    await this.actionTokenRepository.save({
      typeToken: EActionToken.ACTIVATE,
      userId: payload.userId,
      actionToken: activateToken,
    });

    return activateToken;
  }

  public async findByRefreshToken(token): Promise<Token> {
    return await this.tokenRepository.findOne({
      where: { refreshToken: token },
    });
  }

  public async findByAccessToken(token): Promise<Token> {
    return await this.tokenRepository.findOne({
      where: { accessToken: token },
    });
  }

  public async deleteManyTokenByDate(createdAt) {
    await this.tokenRepository.delete({
      createdAt: LessThan(createdAt),
    });
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
      createdAt: LessThan(createdAt),
    });
  }

  public async deleteActionToken(actionToken) {
    await this.actionTokenRepository.delete({ actionToken });
  }
}
