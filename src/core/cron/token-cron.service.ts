import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';

import { TokenService } from '../module/token';

dayjs.extend(utc);

@Injectable()
export class TokenCronService {
  constructor(private readonly tokenService: TokenService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  private async removeExpiredToken() {
    const tenDays = dayjs().utc().subtract(10, 'day').toDate();
    console.log(tenDays);

    await this.tokenService.deleteManyByDate(tenDays);
  }
}
