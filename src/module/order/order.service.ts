import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, LessThan, MoreThan } from 'typeorm';

import { Group, Orders, User } from '../../core/database/entities';
import { AnotherManagerException } from '../../core/exception';
import { GroupRepository } from '../group/group.repository';
import { PageService } from '../page';
import { IPageOptions, IPagePagination } from '../page/model/interface';
import { OrderUpdateDto } from './model/dto';
import { EStatus } from './model/enum';
import { IOrder, IOrderQueriesData } from './model/interface';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly groupRepository: GroupRepository,
    private readonly pageService: PageService,
  ) {}

  public async getAllWithPagination(
    pageOptions: IPageOptions,
    orderData: IOrderQueriesData,
    manager: User,
  ): Promise<IPagePagination<Orders[]>> {
    manager = orderData.manager ? manager : undefined;

    const { typeSort, sortBy } = this.pageService.sortByField(pageOptions.sort);

    const convertedData = this.pageService.convertFieldsToILikePattern(
      orderData.restData,
    ) as IOrder;

    let createdAt;
    if (orderData.end_course && orderData.start_course) {
      createdAt = Between(orderData.start_course, orderData.end_course);
    } else if (orderData.end_course) {
      createdAt = LessThan(orderData.end_course);
    } else if (orderData.start_course) {
      createdAt = MoreThan(orderData.start_course);
    }

    const [orders, totalCount] = await this.orderRepository.getAllByQuery({
      typeSort,
      sortBy,
      orderData: { id: orderData.id, manager, ...convertedData, createdAt },
      skip: pageOptions.skip,
      take: pageOptions.take,
    });

    const pagination = this.pageService.returnWithPagination({
      page: pageOptions.page,
      take: pageOptions.take,
      itemCount: orders.length,
      totalCount,
    });

    return {
      ...pagination,
      data: orders,
    };
  }

  public async update(
    orderData: OrderUpdateDto,
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
