import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Token } from '../../core/database/entities';

@Injectable()
export class TokenRepository extends Repository<Token> {
  constructor(private readonly dataSource: DataSource) {
    super(Token, dataSource.manager);
  }

  public async createToken(accessToken, refreshToken, userId) {
    await this.save({ accessToken, refreshToken, userId });
  }
}
