import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AppConfigModule, AppConfigService } from '../../config/app';
import { ActionTokenRepository } from './action-token.repository';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

@Module({
  imports: [
    AppConfigModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfigService: AppConfigService) => ({
        secret: appConfigService.secretToken,
        signOptions: {
          expiresIn: '10m',
        },
        global: true,
      }),
      inject: [AppConfigService],
    }),
  ],
  providers: [TokenService, TokenRepository, ActionTokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
