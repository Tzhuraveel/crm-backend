import { EUserRole } from '../../../user/model/enum/user-entity.enum';

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
export interface ITokenPayload {
  userId: number;
  role: EUserRole;
}
