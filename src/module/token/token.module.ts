import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AppConfigModule } from '../../config/app';
import { AppConfigService } from '../../config/app';
import { ActionTokenRepository } from './action-token.repository';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

@Module({
  imports: [
    AppConfigModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (configService: AppConfigService) => ({
        secret: configService.secretKey,
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
