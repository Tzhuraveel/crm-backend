import { Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';

import { Orders } from '../../core/database/entities';
import { ESort } from '../../core/enum/dynamic.enum';
import { IPaginationPage, IParameterSearch } from '../../core/interface';
import { QueryDto } from './dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  public generateParameter({
    order,
    page,
    ...userData
  }: QueryDto): IParameterSearch {
    const take = 25;
    const skip = take * (page - 1);

    let sort = ESort.DESC;
    let orderBy = 'id';
    if (order) {
      const isMinus = order.charAt(0) === '-';

      sort = isMinus ? ESort.DESC : ESort.ASC;
      orderBy = isMinus ? order.slice(1, order.length) : order;
    }

    for (const key in userData) {
      userData[key] = ILike(`%${userData[key]}%`);
    }

    return {
      take,
      skip,
      orderBy,
      sort,
      whereField: userData,
    };
  }
  constructor(private readonly orderRepository: OrderRepository) {}

  public async getAllByQuery(
    pageParameters: QueryDto,
  ): Promise<IPaginationPage<Orders[]>> {
    const parameter = this.generateParameter(pageParameters);

    const [orders, totalCount] = await this.orderRepository.getAllByQuery(
      parameter,
    );

    const pageCount = Math.ceil(totalCount / 25);
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
}
