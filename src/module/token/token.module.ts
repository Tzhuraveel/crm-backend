import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AppConfigModule } from '../../config/app/config.module';
import { AppConfigService } from '../../config/app/configuration.service';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

@Module({
  imports: [
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
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
