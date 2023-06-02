import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Token } from '../../database/entities';
import { ITokenPair, ITokenPayload } from '../../interface';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenRepository: TokenRepository,
  ) {}

  public async verifyToken(token): Promise<ITokenPayload> {
    const payload = (await this.jwtService.verifyAsync(token)) as ITokenPayload;

    if (!payload) {
      throw new HttpException('Token not valid', HttpStatus.BAD_REQUEST);
    }

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

  public async findByToken(token): Promise<Token> {
    return await this.tokenRepository.findByToken(token);
  }

  public async findByAccessTokenToken(token): Promise<Token> {
    return await this.tokenRepository.findByAccessTokenToken(token);
  }

  public async deleteManyByDate(createdAt: Date) {
    await this.tokenRepository.deleteMany(createdAt);
  }
}
