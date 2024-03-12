import { Module } from '@nestjs/common';

import { MysqlConfigService } from './mysqlConfig.service';

@Module({
  providers: [MysqlConfigService],
  exports: [MysqlConfigService],
})
export class MysqlConfigModule {}
