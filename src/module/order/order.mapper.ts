import { Injectable } from '@nestjs/common';

import { Orders } from '../../core/database/entities';
import { IOrderExcel } from './model/interface';

@Injectable()
export class OrderMapper {
  public toResponse(order: Orders): IOrderExcel {
    return {
      id: order.id,
      name: order.name,
      surname: order.surname,
      phone: order.phone,
      age: order.age,
      course: order.course,
      course_format: order.course_format,
      course_type: order.course_type,
      status: order.status,
      sum: order.sum,
      alreadyPaid: order.alreadyPaid,
      group: order.group?.name,
      created_at: order.created_at,
      manager: order.manager?.name,
    };
  }

  public toManyResponse(orders: Orders[]): IOrderExcel[] {
    return orders.map(this.toResponse);
  }
}
