export type ConfigType = {
  app: AppConfig;
  mysql: MysqlConfig;
};

export type AppConfig = {
  port: number;
  host: string;
  secretActivateToken: string;
  secretForgotToken: string;
  secretToken: string;
};

export type MysqlConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  dbName: string;
  runMigrations: boolean;
};
