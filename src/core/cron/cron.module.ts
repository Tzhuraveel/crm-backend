import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { TokenModule } from '../module/token';
import { TokenCronService } from './token-cron.service';

@Module({
  imports: [TokenModule, ScheduleModule.forRoot()],
  providers: [TokenCronService],
})
export class CronModule {}
