export type ConfigType = {
  app: AppConfig;
  postgres: MySQLConfig;
};

export type AppConfig = {
  port: number;
  host: string;
  secretActivateToken: string;
  secretForgotToken: string;
  secretToken: string;
};

export type MySQLConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  dbName: string;
  rumMigrations: string;
};
