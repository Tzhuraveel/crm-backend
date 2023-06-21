import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Group, Orders, User } from '../../core/database/entities';
import { OrderUpdateDto } from './model/dto';
import { IOrderStatus } from './model/interface';
import { IParameterSearch } from './model/interface';

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

  public async getOrderStatistic(): Promise<IOrderStatus[]> {
    return this.createQueryBuilder()
      .select('COUNT(*)', 'count')
      .addSelect('status')
      .groupBy('status')
      .getRawMany();
  }

  public async getOrderStatisticById(userId: number): Promise<IOrderStatus[]> {
    return this.createQueryBuilder()
      .select('COUNT(*)', 'count')
      .where('manager = :manager', { manager: userId })
      .addSelect('status')
      .groupBy('status')
      .getRawMany();
  }

  public async getAllForExcel(data: IParameterSearch): Promise<Orders[]> {
    return await this.find({
      where: data.orderData,
      take: data.take,
      skip: data.skip,
      order: {
        [data.sortBy]: data.typeSort,
      },
      relations: ['manager', 'group'],
      select: { manager: { name: true }, group: { name: true } },
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
    orderData: Omit<OrderUpdateDto, 'group'>,
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
