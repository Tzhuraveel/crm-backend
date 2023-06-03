import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Orders } from '../../core/database/entities';
import { IParameterSearch } from '../../core/interface';

@Injectable()
export class OrderRepository extends Repository<Orders> {
  constructor(private readonly dataSource: DataSource) {
    super(Orders, dataSource.manager);
  }

  public async getAllByQuery(
    parameterSearch: IParameterSearch,
  ): Promise<[Orders[], number]> {
    return await this.findAndCount({
      where: parameterSearch.whereField,
      take: parameterSearch.take,
      skip: parameterSearch.skip,
      order: {
        [parameterSearch.orderBy]: parameterSearch.sort,
      },
    });
  }
}
