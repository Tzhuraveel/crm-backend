export abstract class AbstractMysqlConfig {
  abstract get port(): number;
  abstract get host(): string;
  abstract get user(): string;
  abstract get password(): string;
  abstract get dbName(): string;
  abstract get runMigrations(): boolean;
}
