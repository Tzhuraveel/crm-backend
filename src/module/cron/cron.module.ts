import { Module } from '@nestjs/common';

import { TokenModule } from '../token';
import { TokenCronService } from './token-cron.service';

@Module({
  imports: [TokenModule],
  providers: [TokenCronService],
})
export class CronModule {}
