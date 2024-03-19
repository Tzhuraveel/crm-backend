import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ActionToken } from '../../../core/database/entities';

@Injectable()
export class ActionTokenRepository extends Repository<ActionToken> {
  constructor(private readonly dataSource: DataSource) {
    super(ActionToken, dataSource.manager);
  }
}
