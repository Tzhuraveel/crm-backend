import { ESort } from '../../../../core/enum';
import { IOrder } from './order.interface';

export interface IParameterSearch {
  take: number;
  skip: number;
  typeSort: ESort;
  sortBy: string;
  orderData?: IOrder;
}
