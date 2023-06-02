import { Module } from '@nestjs/common';

import { TokenModule } from '../../core/module/token';
import { PasswordModule } from '../../core/service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [PasswordModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
  exports: [AuthService],
})
export class AuthModule {}
