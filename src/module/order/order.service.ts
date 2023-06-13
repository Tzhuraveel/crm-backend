import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, ILike, LessThan, MoreThan } from 'typeorm';

import { Group, Orders, User } from '../../core/database/entities';
import { ESort } from '../../core/enum';
import { AnotherManagerException } from '../../core/exception';
import { GroupRepository } from '../group/group.repository';
import { OrderDto, QueryDto } from './model/dto';
import { EStatus } from './model/enum';
import { IOrderByQuery } from './model/interface';
import {
  IPaginationPage,
  IParameterSearch,
} from './model/interface/page.interface';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly groupRepository: GroupRepository,
  ) {}
  private generateParameter(orderOptions: IOrderByQuery): IParameterSearch {
    const {
      manager,
      sort,
      page,
      take,
      end_course,
      start_course,
      ...orderDate
    } = orderOptions;

    const skip = take * (page - 1);
    let typeSort = ESort.DESC;
    let orderBy = 'id';
    let createdAt;

    if (sort) {
      const isMinus = sort.charAt(0) === '-';
      typeSort = isMinus ? ESort.DESC : ESort.ASC;
      orderBy = isMinus ? sort.slice(1, sort.length) : sort;
    }

    for (const key in orderDate) {
      orderDate[key] = ILike(`%${orderDate[key]}%`);
    }

    if (end_course && start_course) {
      createdAt = Between(start_course, end_course);
    } else if (end_course) {
      createdAt = LessThan(end_course);
    } else if (start_course) {
      createdAt = MoreThan(start_course);
    }

    return {
      take,
      skip,
      orderBy,
      typeSort,
      whereField: { ...orderDate, createdAt, manager },
    };
  }

  public async getAllByQuery(
    queries: QueryDto,
    manager: User,
    take = 25,
  ): Promise<IPaginationPage<Orders[]>> {
    manager = queries.manager ? manager : undefined;

    const parameter = this.generateParameter({
      ...queries,
      manager,
      take,
    });

    const [orders, totalCount] = await this.orderRepository.getAllByQuery(
      parameter,
    );

    const pageCount = Math.ceil(totalCount / take);
    return {
      page: queries.page,
      pageCount,
      itemsCount: orders.length,
      totalCount,
      nextPage: queries.page < pageCount,
      perPage: queries.page > 1,
      data: orders,
    };
  }

  public async update(
    orderData: OrderDto,
    manager: User,
    orderId: number,
  ): Promise<Orders> {
    let groupFromDb: Group;
    let obstacle = undefined;

    const orderFromDb = await this.orderRepository.findOrderWithManager(
      orderId,
    );
    if (!orderFromDb) throw new NotFoundException('Order not found');

    const { manager: managerFromDb } = orderFromDb;
    if (managerFromDb && managerFromDb.id !== manager.id)
      throw new AnotherManagerException();

    if (orderData.group) {
      groupFromDb = await this.groupRepository.findOne({
        where: { id: orderData.group },
      });

      if (!groupFromDb) throw new NotFoundException('Group not found');
    }

    if (managerFromDb && orderData.status === EStatus.NEW) obstacle = null;

    return await this.orderRepository.updateOrder(
      orderId,
      orderData,
      groupFromDb,
      managerFromDb ? obstacle : manager,
    );
  }
}
