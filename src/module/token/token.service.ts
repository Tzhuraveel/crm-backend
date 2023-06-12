import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LessThan } from 'typeorm';

import { Token } from '../../core/database/entities';
import { ITokenPair, ITokenPayload } from './model/interface';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  public async verifyToken(token): Promise<ITokenPayload> {
    const payload = (await this.jwtService.verifyAsync(token)) as ITokenPayload;

    if (!payload)
      throw new HttpException('Token not valid', HttpStatus.BAD_REQUEST);

    return payload;
  }

  public async createTokenPair(payload: ITokenPayload): Promise<ITokenPair> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, { expiresIn: '20m' }),
    ]);

    await this.tokenRepository.createToken(
      accessToken,
      refreshToken,
      payload.userId,
    );

    return { accessToken, refreshToken };
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

  public async deleteManyByDate(createdAt: Date) {
    const token = await this.tokenRepository.delete({
      createdAt: LessThan(createdAt),
    });
    console.log(token);
  }
}
