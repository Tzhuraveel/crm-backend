import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as Path from 'path';
import { DataSourceOptions } from 'typeorm';

import { Group, Orders, Token, User } from '../../core/database/entities';
import { MySqlConfigModule } from './config.module';
import { MySqlConfigService } from './configuration.service';
import { MySqlConfigServiceStatic } from './configuration.service-static';

export class TypeOrmConfigurations {
  static get workingDirectory(): string {
    let path = Path.dirname(require.main.filename);
    const index = path.indexOf('api');
    if (index !== -1) {
      path = path.slice(0, index + 'api'.length);
    }

    return path;
  }

  static get config(): TypeOrmModuleAsyncOptions {
    return {
      imports: [MySqlConfigModule],
      useFactory: (configService: MySqlConfigService) => ({
        type: 'mysql',
        host: configService.host,
        port: configService.port,
        username: configService.user,
        password: configService.password,
        database: configService.database,
        synchronize: false,
        migrationsRun: configService.runMigrations,
        entities: [User, Group, Orders, Token],
        migrationsTableName: 'migrations',
        migrations: [
          `${this.workingDirectory}src/core/database/migrations/*.ts`,
        ],
        cli: {
          migrationsDir: 'src/core/database/migrations',
        },
        // logging: true,
      }),
      inject: [MySqlConfigService],
    };
  }

  static get staticConfig(): DataSourceOptions {
    const folder = !process.env.NODE_ENV ? 'src' : 'dist/src';
    return {
      name: 'default',
      type: 'mysql',
      host: MySqlConfigServiceStatic.host,
      port: MySqlConfigServiceStatic.port,
      username: MySqlConfigServiceStatic.user,
      password: MySqlConfigServiceStatic.password,
      database: MySqlConfigServiceStatic.database,
      synchronize: false,
      migrationsRun: MySqlConfigServiceStatic.runMigrations,
      migrationsTableName: 'migrations',
      entities: [folder + '/**/*.entity{.ts,.js}'],
      migrations: [folder + '/core/database/migrations/*{.js,.ts}'],
    };
  }
}
