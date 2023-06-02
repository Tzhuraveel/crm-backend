import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Token } from '../../database/entities';

@Injectable()
export class TokenRepository extends Repository<Token> {
  constructor(private readonly dataSource: DataSource) {
    super(Token, dataSource.manager);
  }

  public async deleteMany(createdAt: Date) {
    await this.delete({ createdAt });
  }

  public async createToken(accessToken, refreshToken, userId) {
    await this.save({ accessToken, refreshToken, userId });
  }

  public async findByToken(refreshToken: string): Promise<Token> {
    return this.findOne({ where: { refreshToken } });
  }

  public async findByAccessTokenToken(accessToken: string): Promise<Token> {
    return this.findOne({ where: { accessToken } });
  }
}
