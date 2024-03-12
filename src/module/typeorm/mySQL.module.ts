import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MysqlConfigModule } from '../../config/db';
import { MySQLService } from './mySQL.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MysqlConfigModule],
      useClass: MySQLService,
    }),
  ],
})
export class MySQLModule {}
