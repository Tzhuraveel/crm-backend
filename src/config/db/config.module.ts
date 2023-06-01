import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './configuration';
import { MySqlConfigService } from './configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  providers: [ConfigService, MySqlConfigService],
  exports: [ConfigService, MySqlConfigService],
})
export class MySqlConfigModule {}
