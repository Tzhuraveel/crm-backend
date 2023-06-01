import { registerAs } from '@nestjs/config';

const configToken = 'app';
export default registerAs(configToken, () => ({
  port: process.env.APP_PORT,
  apiServerHost: process.env.APP_API_SERVER_HOST,
}));
