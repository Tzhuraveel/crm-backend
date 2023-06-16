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

export interface IOrderByQuery extends IOrderDetails {
  id?: number;
  take: number;
  page?: number;
  sort?: string;
  start_course?: Date;
  end_course?: Date;
}

export interface IOrder extends IOrderDetails {
  id?: number;
  createdAt: Date;
}

export interface IOrderQueriesData {
  id?: number;
  start_course?: Date;
  end_course?: Date;
  manager?: boolean;
  restData: IOrderDetails;
}
