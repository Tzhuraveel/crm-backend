import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LessThan } from 'typeorm';

import { AuthConfigService } from '../../../config/auth';
import { Token } from '../../../core/database/entities';
import { ITokenPair, ITokenPayload } from '../model/interface';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenRepository: TokenRepository,
    private readonly authConfigService: AuthConfigService,
  ) {}

  public async verifyAuthToken(token: string): Promise<ITokenPayload> {
    const payload: ITokenPayload = await this.jwtService.verifyAsync(token);

    if (!payload)
      throw new HttpException('Token not valid', HttpStatus.BAD_REQUEST);

    return payload;
  }

  public async createTokenPair(payload: ITokenPayload): Promise<ITokenPair> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        expiresIn: this.authConfigService.refreshSecretTokenExpiration,
      }),
    ]);

    await this.tokenRepository.save({
      accessToken,
      refreshToken,
      userId: payload.userId,
    });

    return { accessToken, refreshToken };
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
}
