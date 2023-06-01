import { ConfigurationServiceStatic } from '../configuration.service-static';

export class AppConfigServiceStatic {
  static get environment(): string {
    return ConfigurationServiceStatic.get('APP_ENVIRONMENT');
  }

  static get port(): number {
    return Number(ConfigurationServiceStatic.get('APP_PORT'));
  }

  static get webServerHost(): string {
    return ConfigurationServiceStatic.get('APP_WEB_SERVER_HOST');
  }

  static get apiServerHost(): string {
    return ConfigurationServiceStatic.get('APP_API_SERVER_HOST');
  }
}
