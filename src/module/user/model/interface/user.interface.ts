import { ESort } from '../../../../core/enum';
import { EUserRole } from '../enum';

export interface IUserParameter {
  take: number;
  skip: number;
  typeSort: ESort;
  sortBy: string;
  convertedData: IUserData & { role: EUserRole };
}

export interface IUserData {
  name: string;
  surname: string;
  email: string;
}

export interface IUserQueriesData {
  start_login: Date;
  end_login: Date;
  restData: IUserData;
}
