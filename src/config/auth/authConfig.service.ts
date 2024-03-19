import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthConfig, ConfigType } from '../config.type';
import { AbstractAuthConfigService } from './authConfig.abstract';

@Injectable()
export class AuthConfigService extends AbstractAuthConfigService {
  private readonly authConfig = this.configService.get<AuthConfig>('auth');
  constructor(private readonly configService: ConfigService<ConfigType>) {
    super();
  }

  get accessSecretToken(): string {
    return this.authConfig.accessTokenSecret;
  }

  get accessSecretTokenExpiration(): string {
    return this.authConfig.accessTokenSecretExpiration;
  }

  get refreshSecretToken(): string {
    return this.authConfig.refreshTokenSecret;
  }

  get refreshSecretTokenExpiration(): string {
    return this.authConfig.refreshTokenSecretExpiration;
  }

  get activateSecretToken(): string {
    return this.authConfig.activateSecretToken;
  }

  get activateSecretTokenExpiration(): string {
    return this.authConfig.activateSecretTokenExpiration;
  }

  get forgotSecretToken(): string {
    return this.authConfig.forgotSecretToken;
  }

  get forgotSecretTokenExpiration(): string {
    return this.authConfig.forgotSecretTokenExpiration;
  }
}
