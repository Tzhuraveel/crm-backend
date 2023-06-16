import { registerAs } from '@nestjs/config';
import * as process from 'process';

const configToken = 'app';
export default registerAs(configToken, () => ({
  port: process.env.APP_PORT,
  secretTokenKey: process.env.SECRET_TOKEN_KEY,
  secretActionTokenKey: process.env.SECRET_ACTION_TOKEN_KEY,
  apiServerHost: process.env.APP_API_SERVER_HOST,
}));
