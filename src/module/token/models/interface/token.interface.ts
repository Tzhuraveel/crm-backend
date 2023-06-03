import { EUserRole } from '../../../../core/enum';

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
export interface ITokenPayload {
  userId: number;
  role: EUserRole;
}
