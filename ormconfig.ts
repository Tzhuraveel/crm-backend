import * as path from 'node:path';

import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import getConfig from './src/config/config';

dotenv.config({ path: './environments/local.env' });
const mySQLConfig = getConfig().mysql;

export default new DataSource({
  type: 'mysql',
  host: mySQLConfig.host,
  port: mySQLConfig.port,
  username: mySQLConfig.user,
  password: mySQLConfig.password,
  database: mySQLConfig.dbName,
  entities: [
    path.join(
      process.cwd(),
      'src',
      'core',
      'database',
      'entities',
      '*.entity.ts',
    ),
  ],
  migrations: [
    path.join(process.cwd(), 'src', 'core', 'database', 'migrations', '*.ts'),
  ],
  migrationsTableName: 'migrations',
  migrationsRun: mySQLConfig.runMigrations,
  synchronize: false,
});
