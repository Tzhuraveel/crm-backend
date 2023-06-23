import { Injectable } from '@nestjs/common';

import { QueryDto } from '../order/model/dto';
import { IOrderQueriesData } from '../order/model/interface';
import { IPageOptions } from './model/interface';

@Injectable()
export class PageMapper {
  public toRequestQuery(pageOptions: QueryDto): {
    pageData: IPageOptions;
    orderData: IOrderQueriesData;
  } {
    const {
      page,
      take,
      skip,
      sort,
      id,
      manager,
      start_course,
      end_course,
      ...restData
    } = pageOptions;
    const pageData = { page, take, skip, sort } as IPageOptions;
    const orderData = {
      id,
      manager,
      start_course,
      end_course,
      restData,
    } as IOrderQueriesData;

    return { pageData, orderData };
  }
}
