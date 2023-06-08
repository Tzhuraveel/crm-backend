import { ESort } from '../../../../core/enum';
import { IOrder } from './order.interface';

export interface IPaginationPage<T> {
  page: number;
  perPage: boolean;
  nextPage: boolean;
  itemsCount: number;
  pageCount: number;
  totalCount: number;
  data: T;
}

export interface IParameterSearch {
  take: number;
  skip: number;
  typeSort?: ESort;
  orderBy?: string;
  whereField?: IOrder;
}
