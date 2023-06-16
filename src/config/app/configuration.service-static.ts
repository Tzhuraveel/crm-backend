import { ConfigurationServiceStatic } from '../configuration.service-static';

export class AppConfigServiceStatic {
  static get environment(): string {
    return ConfigurationServiceStatic.get('APP_ENVIRONMENT');
  }

  static get port(): number {
    return Number(ConfigurationServiceStatic.get('APP_PORT'));
  }
}
