import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Group, Orders, User } from '../../core/database/entities';
import { IParameterSearch } from '../../core/interface';
import { OrderDto } from './model/dto';

const manager = {
  id: true,
  name: true,
  surname: true,
};

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
        [parameterSearch.orderBy]: parameterSearch.typeSort,
      },
      relations: ['manager', 'group', 'comment', 'comment.manager'],
      select: {
        manager,
        comment: {
          id: true,
          comment: true,
          createdAt: true,
          manager,
        },
      },
    });
  }

  public async findOrderWithManager(id: number) {
    return await this.findOne({
      where: { id },
      relations: {
        manager: true,
      },
    });
  }

  public async updateOrder(
    orderId: number,
    orderData: OrderDto,
    group: Group,
    manager: User | undefined,
  ) {
    await this.update(orderId, {
      ...orderData,
      group,
      manager,
    });
  }
}
