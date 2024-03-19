import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

import { ActionTokenService } from '../token/services/action-token.service';
import { TokenService } from '../token';

dayjs.extend(utc);

@Injectable()
export class TokenCronService {
  constructor(
    private readonly actionTokenService: ActionTokenService,
    private readonly tokenService: TokenService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  private async removeExpiredToken() {
    const minutes = dayjs()
      .utc()
      .subtract(3, 'hour')
      .subtract(10, 'm')
      .toDate();

    await this.tokenService.deleteManyTokenByDate(minutes);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  private async removeExpiredActionToken() {
    const minutes = dayjs()
      .utc()
      .subtract(3, 'hour')
      .subtract(10, 'm')
      .toDate();

    await this.actionTokenService.deleteManyActionTokenByDate(minutes);
  }
}
