import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigServiceStatic } from '../../../config/app/configuration.service-static';
import { Token } from '../../database/entities';
import { TokenRepository } from './token.repository';
import { TokenService } from './token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    JwtModule.register({
      global: true,
      secret: AppConfigServiceStatic.secretKey,
      signOptions: {
        expiresIn: '10m',
      },
    }),
  ],
  providers: [TokenService, TokenRepository],
  exports: [TokenService, TokenRepository],
})
export class TokenModule {}
