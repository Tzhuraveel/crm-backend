import { Module } from '@nestjs/common';

import { TokenModule } from '../token';
import { UserRepository } from '../user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';

@Module({
  imports: [TokenModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, PasswordService],
  exports: [AuthService],
})
export class AuthModule {}
