import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';

import { Group, Orders, User } from '../../core/database/entities';
import { ESort } from '../../core/enum';
import { IPaginationPage, IParameterSearch } from '../../core/interface';
import { GroupRepository } from '../group/group.repository';
import { OrderDto, QueryDto } from './model/dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly groupRepository: GroupRepository,
  ) {}
  public generateParameter({
    sort,
    page,
    take,
    ...userData
  }: QueryDto & { take: number }): IParameterSearch {
    const skip = take * (page - 1);
    let typeSort = ESort.DESC;
    let orderBy = 'id';

    if (sort) {
      const isMinus = sort.charAt(0) === '-';
      typeSort = isMinus ? ESort.DESC : ESort.ASC;
      orderBy = isMinus ? sort.slice(1, sort.length) : sort;
    }

    for (const key in userData) {
      userData[key] = ILike(`%${userData[key]}%`);
    }

    return {
      take,
      skip,
      orderBy,
      typeSort,
      whereField: userData,
    };
  }

  public async getAllByQuery(
    pageParameters: QueryDto,
    take = 25,
  ): Promise<IPaginationPage<Orders[]>> {
    const parameter = this.generateParameter({ ...pageParameters, take });

    const [orders, totalCount] = await this.orderRepository.getAllByQuery(
      parameter,
    );

    const pageCount = Math.ceil(totalCount / take);
    return {
      page: pageParameters.page,
      pageCount,
      itemsCount: orders.length,
      totalCount,
      nextPage: pageParameters.page < pageCount,
      perPage: pageParameters.page > 1,
      data: orders,
    };
  }

  public async update(orderData: OrderDto, manager: User, orderId: number) {
    const orderFromDb = await this.orderRepository.findOrderWithManager(
      orderId,
    );

    if (!orderFromDb) {
      throw new HttpException('Order not found', HttpStatus.BAD_REQUEST);
    }

    const { manager: managerFromDb } = orderFromDb;

    if (managerFromDb && managerFromDb.id !== manager.id) {
      throw new HttpException(
        'This user is already handled by another manager',
        HttpStatus.FORBIDDEN,
      );
    }

    let groupFromDb: Group;
    if (orderData.group) {
      groupFromDb = await this.groupRepository.findByGroupName(orderData.group);

      if (!groupFromDb) {
        throw new HttpException('Group not found', HttpStatus.BAD_REQUEST);
      }
    }

    await this.orderRepository.updateOrder(
      orderId,
      orderData,
      groupFromDb,
      managerFromDb ? undefined : manager,
    );
  }
}
