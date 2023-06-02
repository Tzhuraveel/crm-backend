import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Token } from '../../database/entities';

@Injectable()
export class TokenRepository {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  public async deleteMany(createdAt: Date) {
    await this.tokenRepository.delete({ createdAt });
  }

  public async create(accessToken, refreshToken, userId) {
    await this.tokenRepository.save({ accessToken, refreshToken, userId });
  }

  public async findByToken(refreshToken: string): Promise<Token> {
    return this.tokenRepository.findOne({ where: { refreshToken } });
  }

  public async findByAccessTokenToken(accessToken: string): Promise<Token> {
    return this.tokenRepository.findOne({ where: { accessToken } });
  }
}
