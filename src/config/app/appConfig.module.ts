import { Module } from '@nestjs/common';

import { AppConfigService } from './appConfig.service';

@Module({
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
