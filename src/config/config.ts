import * as process from 'process';

import { ConfigType } from './config.type';

export default (): ConfigType => ({
  app: {
    port: parseInt(process.env.APP_PORT),
    host: process.env.APP_HOST,
  },
  auth: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenSecretExpiration: process.env.ACCESS_TOKEN_SECRET_EXPIRATION,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenSecretExpiration: process.env.REFRESH_TOKEN_SECRET_EXPIRATION,
    activateSecretToken: process.env.ACTIVATE_TOKEN_SECRET,
    activateSecretTokenExpiration: process.env.ACTIVATE_TOKEN_SECRET_EXPIRATION,
    forgotSecretToken: process.env.FORGOT_TOKEN_SECRET,
    forgotSecretTokenExpiration: process.env.FORGOT_TOKEN_SECRET_EXPERITION,
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
