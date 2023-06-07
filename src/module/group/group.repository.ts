import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Group } from '../../core/database/entities';

@Injectable()
export class GroupRepository extends Repository<Group> {
  constructor(private readonly dataSource: DataSource) {
    super(Group, dataSource.manager);
  }

  public async findByGroupName(name: string) {
    return this.findOne({ where: { name } });
  }
}
