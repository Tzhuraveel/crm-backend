import * as process from 'process';

import { ConfigType } from './config.type';

export default (): ConfigType => ({
  app: {
    port: parseInt(process.env.APP_PORT),
    host: process.env.APP_HOST,
    secretToken: process.env.SECRET_TOKEN_KEY,
    secretActivateToken: process.env.SECRET_ACTION_ACTIVATE_TOKEN_KEY,
    secretForgotToken: process.env.SECRET_ACTION_FORGOT_TOKEN_KEY,
  },
  postgres: {
    port: parseInt(process.env.DATABASE_HOST),
    host: process.env.DATABASE_PORT,
    dbName: process.env.DATABASE_USER,
    user: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    rumMigrations: process.env.DATABASE_RUN_MIGRATIONS,
  },
});
