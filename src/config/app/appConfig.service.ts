import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig, ConfigType } from '../config.type';
import { AbstractAppConfigService } from './appConfig.abstract';

@Injectable()
export class AppConfigService extends AbstractAppConfigService {
  private readonly appConfig = this.configService.get<AppConfig>('app');
  constructor(private readonly configService: ConfigService<ConfigType>) {
    super();
  }
  get port(): number {
    return this.appConfig.port;
  }

  get host(): string {
    return this.appConfig.host;
  }
}
