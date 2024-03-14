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

  get secretToken(): string {
    return this.authConfig.secretToken;
  }
  get secretTokenExpiration(): string {
    return this.authConfig.secretTokenExpiration;
  }

  get secretForgotToken(): string {
    return this.authConfig.secretForgotToken;
  }

  get secretForgotTokenExpiration(): string {
    return this.authConfig.secretForgotTokenExpiration;
  }

  get secretActivateToken(): string {
    return this.authConfig.secretActivateToken;
  }

  get secretActivateTokenExpiration(): string {
    return this.authConfig.secretActivateTokenExpiration;
  }
}
