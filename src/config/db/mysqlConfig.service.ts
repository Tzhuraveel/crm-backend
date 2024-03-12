import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigType, MysqlConfig } from '../config.type';
import { AbstractMysqlConfig } from './mysqlConfig.abstract';

@Injectable()
export class MysqlConfigService extends AbstractMysqlConfig {
  private readonly mySQLConfig = this.configService.get<MysqlConfig>('mysql');

  constructor(private readonly configService: ConfigService<ConfigType>) {
    super();
  }
  get port(): number {
    return this.mySQLConfig.port;
  }

  get host(): string {
    return this.mySQLConfig.host;
  }

  get user(): string {
    return this.mySQLConfig.user;
  }

  get password(): string {
    return this.mySQLConfig.password;
  }

  get dbName(): string {
    return this.mySQLConfig.dbName;
  }

  get runMigrations(): boolean {
    return this.mySQLConfig.runMigrations;
  }
}
