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
  secretActivateToken: string;
  secretForgotToken: string;
  secretToken: string;
  secretTokenExpiration: string;
  secretActivateTokenExpiration: string;
  secretForgotTokenExpiration: string;
};

export type MysqlConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  dbName: string;
  runMigrations: boolean;
};
