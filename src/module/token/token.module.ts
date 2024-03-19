import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthConfigModule, AuthConfigService } from '../../config/auth';
import { ActionTokenRepository } from './services/action-token.repository';
import { ActionTokenService } from './services/action-token.service';
import { TokenRepository } from './services/token.repository';
import { TokenService } from './services/token.service';

const JwtFactory = (authConfigService: AuthConfigService) => ({
  secret: authConfigService.accessSecretToken,
  signOptions: {
    expiresIn: authConfigService.accessSecretTokenExpiration,
  },
  global: true,
});

const JwtRegistrationOptions = {
  imports: [AuthConfigModule],
  useFactory: JwtFactory,
  inject: [AuthConfigService],
};

@Module({
  imports: [AuthConfigModule, JwtModule.registerAsync(JwtRegistrationOptions)],
  providers: [
    TokenService,
    ActionTokenService,
    TokenRepository,
    ActionTokenRepository,
  ],
  exports: [TokenService, ActionTokenService],
})
export class TokenModule {}
