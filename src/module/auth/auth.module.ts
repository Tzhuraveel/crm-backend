import { Module } from '@nestjs/common';

import { TokenModule } from '../token';
import { UserModule } from '../user';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { PasswordService } from './services/password.service';

@Module({
  imports: [TokenModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, PasswordService],
  exports: [AuthService],
})
export class AuthModule {}
