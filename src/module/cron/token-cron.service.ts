import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

import { TokenService } from '../token';

dayjs.extend(utc);

@Injectable()
export class TokenCronService {
  constructor(private readonly tokenService: TokenService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  private async removeExpiredToken() {
    const minutes = dayjs()
      .utc()
      .subtract(3, 'hour')
      .subtract(10, 'm')
      .toDate();

    await this.tokenService.deleteManyTokenByDate(minutes);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  private async removeExpiredActionToken() {
    const minutes = dayjs()
      .utc()
      .subtract(3, 'hour')
      .subtract(10, 'm')
      .toDate();

    await this.tokenService.deleteManyActionTokenByDate(minutes);
  }
}
