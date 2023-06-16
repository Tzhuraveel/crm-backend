import { Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';

import { ESort } from '../../core/enum';
import { IPageParameter, IPageResponse } from './model/interface';

@Injectable()
export class PageService {
  public sortByField(sort: string): { typeSort: ESort; sortBy: string } {
    let typeSort = ESort.DESC;
    let sortBy = 'id';
    if (sort) {
      const isMinus = sort.charAt(0) === '-';
      typeSort = isMinus ? ESort.DESC : ESort.ASC;
      sortBy = isMinus ? sort.slice(1, sort.length) : sort;
    }
    return {
      typeSort,
      sortBy,
    };
  }

  public convertFieldsToILikePattern(data: object) {
    for (const key in data) {
      data[key] = ILike(`%${data[key]}%`);
    }

    return data;
  }

  public returnWithPagination(parameter: IPageParameter): IPageResponse {
    const pageCount = Math.ceil(parameter.totalCount / parameter.take);
    const nextPage = parameter.page < pageCount;
    const prevPage = parameter.page > 1;

    return {
      page: parameter.page,
      pageCount,
      itemCount: parameter.itemCount,
      totalCount: parameter.totalCount,
      nextPage,
      prevPage,
    };
  }
}
