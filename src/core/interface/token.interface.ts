import { EUserRole } from '../enum';

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
export interface ITokenPayload {
  userId: number;
  role: EUserRole;
}
