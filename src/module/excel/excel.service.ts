import { BadRequestException, Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
import * as tmp from 'tmp';

import { User } from '../../core/database/entities';
import { OrderService } from '../order';
import { IOrderExcel, IOrderQueriesData } from '../order/model/interface';
import { OrderMapper } from '../order/order.mapper';
import { IPageOptions } from '../page/model/interface';

@Injectable()
export class ExcelService {
  private orders: IOrderExcel[];
  constructor(
    private readonly orderService: OrderService,
    private readonly orderMapper: OrderMapper,
  ) {}
  public async downloadExcel(
    pageOptions: IPageOptions,
    orderData: IOrderQueriesData,
    manager: User,
  ) {
    const ordersFromDb = await this.orderService.getAllForExcelFile(
      pageOptions,
      orderData,
      manager,
    );

    this.orders = this.orderMapper.toManyResponse(ordersFromDb);

    const rows = [];

    this.orders.forEach((order) => {
      rows.push(Object.values(order));
    });

    const book = new Workbook();

    const sheet = book.addWorksheet('crm');

    rows.unshift(Object.keys(this.orders[0]));

    sheet.addRows(rows);

    this.styleSheet(sheet);

    return new Promise((resolve) => {
      tmp.file(
        {
          discardDescriptor: true,
          prefix: 'crm',
          postfix: '.xlsx',
          mode: parseInt('0600', 8),
        },
        async (err, file) => {
          if (err) throw new BadRequestException(err);

          await book.xlsx.writeFile(file);
          resolve(file);
        },
      );
    });
  }
  private styleSheet(sheet) {
    for (let i = 1; i <= Object.keys(this.orders[0]).length; i++) {
      sheet.getColumn(i).width = 21;
    }

    sheet.getRow(1).height = 31;
    sheet.getRow(1).font = {
      size: 17,
      underline: true,
    };

    sheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'darkTrellis',
      fgColor: { argb: 'FFFFFF00' },
    };

    sheet.getRow(1).border = {
      top: { style: 'double', color: { argb: 'FF00FF00' } },
      left: { style: 'double', color: { argb: 'FF00FF00' } },
      bottom: { style: 'double', color: { argb: 'FF00FF00' } },
      right: { style: 'double', color: { argb: 'FF00FF00' } },
    };
  }
}
