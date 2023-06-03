import { Module } from '@nestjs/common';

import { PasswordModule } from '../../core/service';
import { TokenModule } from '../token';
import { UserRepository } from '../user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PasswordModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
  exports: [AuthService],
})
export class AuthModule {}
