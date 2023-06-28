import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from '../../module/auth/auth.module';
import { TokenModule } from '../../module/token';
import { BearerStrategy } from './bearer.strategy';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer' }),
    AuthModule,
    TokenModule,
  ],
  providers: [BearerStrategy],
  exports: [PassportModule],
})
export class PassportWrapperModule {}
