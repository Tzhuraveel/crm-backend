import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthConfigModule, AuthConfigService } from '../../config/auth';
import { ActionTokenRepository } from './action-token.repository';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

@Module({
  imports: [
    AuthConfigModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      useFactory: async (authConfigService: AuthConfigService) => ({
        secret: authConfigService.secretToken,
        signOptions: {
          expiresIn: authConfigService.secretTokenExpiration,
        },
        global: true,
      }),
      inject: [AuthConfigService],
    }),
  ],
  providers: [TokenService, TokenRepository, ActionTokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
