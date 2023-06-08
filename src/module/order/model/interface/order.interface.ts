import {
  ECourse,
  ECourseFormat,
  ECourseType,
  EStatus,
} from '../enum/course.enum';

interface IOrderDetail {
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

export interface IOrderByQuery extends IOrderDetail {
  take: number;
  page?: number;
  sort?: string;
  start_course?: Date;
  end_course?: Date;
}

export interface IOrder extends IOrderDetail {
  createdAt: any;
}
