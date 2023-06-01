import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigServiceStatic } from '../../config/app/configuration.service-static';
import { User } from '../../core/database/entities';
import { PasswordModule } from '../../core/service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: AppConfigServiceStatic.secretKey,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    PasswordModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [AuthRepository],
})
export class AuthModule {}
