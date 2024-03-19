export type ConfigType = {
  app: AppConfig;
  auth: AuthConfig;
  mysql: MysqlConfig;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type AuthConfig = {
  accessTokenSecret: string;
  accessTokenSecretExpiration: string;
  refreshTokenSecret: string;
  refreshTokenSecretExpiration: string;
  activateSecretToken: string;
  activateSecretTokenExpiration: string;
  forgotSecretToken: string;
  forgotSecretTokenExpiration: string;
};

export type MysqlConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  dbName: string;
  runMigrations: boolean;
};
