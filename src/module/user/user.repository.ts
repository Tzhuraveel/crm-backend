import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { User } from '../../core/database/entities';
import { EDbField } from '../../core/enum';
import { RegisterDto } from '../auth/model/dto';
import { EUserRole } from './model/enum';
import { IUserParameter } from './model/interface';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  public async createManager(user: RegisterDto): Promise<User> {
    return await this.save({ ...user, role: EUserRole.MANAGER });
  }

  public async findByUniqueField(field: string | number, dbField: EDbField) {
    return this.findOne({ where: { [dbField]: field } });
  }

  public async findManyByQuery(
    data: IUserParameter,
  ): Promise<[User[], number]> {
    return await this.findAndCount({
      where: data.convertedData,
      skip: data.skip,
      take: data.take,
      order: {
        [data.sortBy]: data.typeSort,
      },
    });
  }
}
