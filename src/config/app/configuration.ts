import { registerAs } from '@nestjs/config';
import * as process from 'process';

const configToken = 'app';
export default registerAs(configToken, () => ({
  port: process.env.APP_PORT,
  secretTokenKey: process.env.SECRET_TOKEN_KEY,
  secretActionActivateTokenKey: process.env.SECRET_ACTION_ACTIVATE_TOKEN_KEY,
  secretActionForgotTokenKey: process.env.SECRET_ACTION_FORGOT_TOKEN_KEY,

  apiServerHost: process.env.APP_API_SERVER_HOST,
}));
