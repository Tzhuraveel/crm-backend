import * as process from 'process';

import { ConfigType } from './config.type';

export default (): ConfigType => ({
  app: {
    port: parseInt(process.env.APP_PORT),
    host: process.env.APP_HOST,
  },
  auth: {
    secretToken: process.env.SECRET_TOKEN_KEY,
    secretForgotToken: process.env.SECRET_ACTION_FORGOT_TOKEN,
    secretActivateToken: process.env.SECRET_ACTION_ACTIVATE_TOKEN,
    secretTokenExpiration: process.env.SECRET_TOKEN_EXPERATION,
    secretActivateTokenExpiration:
      process.env.SECRET_ACTION_ACTIVATE_TOKEN_EXPERATION,
    secretForgotTokenExpiration:
      process.env.SECRET_ACTION_FORGOT_TOKEN_EXPERATION,
  },
  mysql: {
    port: parseInt(process.env.DATABASE_PORT),
    host: process.env.DATABASE_HOST,
    dbName: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    runMigrations: process.env.DATABASE_RUN_MIGRATIONS === 'true',
  },
});
