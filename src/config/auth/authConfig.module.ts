import { Module } from '@nestjs/common';

import { AuthConfigService } from './authConfig.service';

@Module({
  providers: [AuthConfigService],
  exports: [AuthConfigService],
})
export class AuthConfigModule {}
