import { QueryDto } from '../../model/order/dto';
import { ESort } from '../enum/dynamic.enum';

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
  sort?: ESort;
  orderBy?: string;
  whereField?: Pick<QueryDto, 'surname' | 'email' | 'age' | 'phone' | 'name'>;
}
