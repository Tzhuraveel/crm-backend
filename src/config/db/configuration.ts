import { registerAs } from '@nestjs/config';

const configToken = 'mysql';
export default registerAs(configToken, () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  runMigrations: process.env.DATABASE_RUN_MIGRATIONS,
}));
