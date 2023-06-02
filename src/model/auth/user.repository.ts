import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { User } from '../../core/database/entities';
import { EDbField } from '../../core/enum/dynamic.enum';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  public async createUser(body) {
    await this.save(body);
  }

  public async findByUniqueField(field: string | number, dbField: EDbField) {
    return this.findOne({ where: { [dbField]: field } });
  }
}
