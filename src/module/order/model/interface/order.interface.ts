import { User } from '../../../../core/database/entities';
import { ECourse, ECourseFormat, ECourseType, EStatus } from '../enum';

interface IOrderDetails {
  manager?: User | undefined;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  age?: number;
  course_format?: ECourseFormat;
  course_type?: ECourseType;
  course?: ECourse;
  status?: EStatus;
}

export interface IOrder extends IOrderDetails {
  id?: number;
  created_at: Date;
}

export interface IOrderQueriesData {
  id?: number;
  start_course?: Date;
  end_course?: Date;
  manager?: boolean;
  restData: IOrderDetails;
}

export interface IOrderStatus {
  status: EStatus;
  count: string;
}

export interface IOrderMoneys {
  totalSum: string;
  totalAlreadyPaid: string;
}

export interface IOrderStatusesStatistic {
  total: number;
  statuses: IOrderStatus[];
}
export interface IOrderTotalStatistic extends IOrderStatusesStatistic {
  totalSum: number;
  totalAlreadyPaid: number;
  totalSumUSD: number;
  totalAlreadyPaidUSD: number;
}

export interface IOrderExcel {
  id: number;
  name: string;
  surname: string;
  phone: string;
  age: number;
  course: ECourse;
  course_format: ECourseFormat;
  course_type: ECourseType;
  status: EStatus;
  sum: number;
  alreadyPaid: number;
  group: string;
  created_at: Date;
  manager: string;
}
