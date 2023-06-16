import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Group, Orders, User } from '../../core/database/entities';
import { OrderDto } from './model/dto';
import { IParameterSearch } from './model/interface/page.interface';

const managerField = {
  id: true,
  name: true,
  surname: true,
};

const selectedRelative = {
  manager: managerField,
  comment: {
    id: true,
    comment: true,
    createdAt: true,
    manager: managerField,
  },
};

@Injectable()
export class OrderRepository extends Repository<Orders> {
  constructor(private readonly dataSource: DataSource) {
    super(Orders, dataSource.manager);
  }

  public async getAllByQuery(
    data: IParameterSearch,
  ): Promise<[Orders[], number]> {
    return await this.findAndCount({
      where: data.orderData,
      take: data.take,
      skip: data.skip,
      order: {
        [data.sortBy]: data.typeSort,
      },
      relations: ['manager', 'group', 'comment', 'comment.manager'],
      select: selectedRelative,
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
    orderData: Omit<OrderDto, 'group'>,
    group: Group,
    manager: User | undefined | null,
  ): Promise<Orders> {
    await this.update(orderId, {
      ...orderData,
      group,
      manager,
    });

    return await this.findOne({
      where: { id: orderId },
      relations: ['manager', 'group', 'comment', 'comment.manager'],
      select: selectedRelative,
    });
  }
}
