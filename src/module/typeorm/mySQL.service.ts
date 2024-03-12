import * as path from 'node:path';

import { Injectable } from '@nestjs/common';
import {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

import { MysqlConfigService } from '../../config/db/mysqlConfig.service';

@Injectable()
export class MySQLService implements TypeOrmOptionsFactory {
  constructor(private readonly mySQLConfigService: MysqlConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.mySQLConfigService.host,
      port: this.mySQLConfigService.port,
      username: this.mySQLConfigService.user,
      password: this.mySQLConfigService.password,
      database: this.mySQLConfigService.dbName,
      entities: [
        path.join(
          process.cwd(),
          'dist',
          'src',
          'core',
          'database',
          'entities',
          '*.entity.js',
        ),
      ],
      migrations: [
        path.join(
          process.cwd(),
          'dist',
          'src',
          'core',
          'database',
          'migrations',
          '*.js',
        ),
      ],
      migrationsRun: this.mySQLConfigService.runMigrations,
      synchronize: false,
    };
  }
}
