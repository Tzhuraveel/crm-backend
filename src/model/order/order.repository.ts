import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Orders } from '../../core/database/entities';
import { IParameterSearch } from '../../core/interface';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
  ) {}

  public async getAllByQuery(
    parameterSearch: IParameterSearch,
  ): Promise<[Orders[], number]> {
    return await this.ordersRepository.findAndCount({
      where: parameterSearch.whereField,
      take: parameterSearch.take,
      skip: parameterSearch.skip,
      order: {
        [parameterSearch.orderBy]: parameterSearch.sort,
      },
    });
  }
}
