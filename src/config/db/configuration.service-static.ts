import { ConfigurationServiceStatic } from '../configuration.service-static';

export class MySqlConfigServiceStatic {
  static get host(): string {
    return ConfigurationServiceStatic.get('DATABASE_HOST');
  }

  static get port(): number {
    return Number(ConfigurationServiceStatic.get('DATABASE_PORT'));
  }

  static get user(): string {
    return ConfigurationServiceStatic.get('DATABASE_USER');
  }

  static get password(): string {
    return ConfigurationServiceStatic.get('DATABASE_PASSWORD');
  }

  static get database(): string {
    return ConfigurationServiceStatic.get('DATABASE_NAME');
  }

  static get runMigrations(): boolean {
    return !!ConfigurationServiceStatic.get('DATABASE_RUN_MIGRATIONS');
  }
}
