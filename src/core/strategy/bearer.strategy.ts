import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

import { AuthService } from '../../module/auth/auth.service';
import { TokenService } from '../../module/token';
import { ITokenPayload } from '../../module/token/models/interface';
import { EDbField, EDynamicallyAction } from '../enum';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(token): Promise<any> {
    const tokenFromBd = await this.tokenService.findByAccessTokenToken(token);

    if (!tokenFromBd) {
      throw new HttpException('Token not found', 400);
    }

    const payload = (await this.tokenService.verifyToken(
      token,
    )) as ITokenPayload;

    const user = await this.authService.checkIsUserExist(
      EDynamicallyAction.NEXT,
      payload.userId,
      EDbField.ID,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
