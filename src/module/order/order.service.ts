import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, LessThan, MoreThan } from 'typeorm';

import { Group, Orders, User } from '../../core/database/entities';
import { EDbField, EDynamicallyAction } from '../../core/enum';
import {
  AnotherManagerException,
  NotFoundEntityException,
} from '../../core/exception';
import { AuthService } from '../auth';
import { GroupRepository } from '../group/group.repository';
import { PageService } from '../page';
import { IPageOptions, IPagePagination } from '../page/model/interface';
import { OrderUpdateDto } from './model/dto';
import { EStatus } from './model/enum';
import { IOrder, IOrderQueriesData, IOrderStatistics } from './model/interface';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly authService: AuthService,
    private readonly orderRepository: OrderRepository,
    private readonly groupRepository: GroupRepository,
    private readonly pageService: PageService,
  ) {}

  private generateCreatedAtClause(start_course: Date, end_course: Date): Date {
    let created_at;
    if (end_course && start_course) {
      created_at = Between(start_course, end_course);
    } else if (end_course) {
      created_at = LessThan(end_course);
    } else if (start_course) {
      created_at = MoreThan(start_course);
    }

    return created_at;
  }

  public async getAllWithPagination(
    pageOptions: IPageOptions,
    orderData: IOrderQueriesData,
    user: User,
  ): Promise<IPagePagination<Orders[]>> {
    const manager = orderData.manager ? user : undefined;

    const { typeSort, sortBy } = this.pageService.sortByField(pageOptions.sort);

    const convertedData = this.pageService.convertFieldsToILikePattern(
      orderData.restData,
    ) as IOrder;

    const created_at = this.generateCreatedAtClause(
      orderData.start_course,
      orderData.end_course,
    );
    const [orders, totalCount] = await this.orderRepository.getAllByQuery({
      typeSort,
      sortBy,
      orderData: { id: orderData.id, manager, ...convertedData, created_at },
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

  public async getAllForExcelFile(
    pageOptions: IPageOptions,
    orderData: IOrderQueriesData,
    user: User,
  ): Promise<Orders[]> {
    const manager = orderData.manager ? user : undefined;

    const { typeSort, sortBy } = this.pageService.sortByField(pageOptions.sort);

    const convertedData = this.pageService.convertFieldsToILikePattern(
      orderData.restData,
    ) as IOrder;

    const created_at = this.generateCreatedAtClause(
      orderData.start_course,
      orderData.end_course,
    );

    return await this.orderRepository.getAllForExcel({
      typeSort,
      sortBy,
      orderData: { id: orderData.id, manager, ...convertedData, created_at },
      skip: pageOptions.skip,
      take: pageOptions.take,
    });
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

  public async getOrderStatistics(): Promise<IOrderStatistics> {
    const statuses = await this.orderRepository.getOrderStatistic();

    const total = statuses.reduce(
      (accum, value) => accum + parseInt(value.count),
      0,
    );

    return { total, statuses };
  }

  public async getUserStatistics(userId: number): Promise<IOrderStatistics> {
    const userFromDb = await this.authService.checkIsUserExist(
      EDynamicallyAction.NEXT,
      userId,
      EDbField.ID,
    );

    if (!userFromDb) {
      throw new NotFoundEntityException('User');
    }

    const statuses = await this.orderRepository.getOrderStatisticById(userId);

    const total = statuses.reduce(
      (accum, value) => accum + parseInt(value.count),
      0,
    );

    return { total, statuses };
  }
}
