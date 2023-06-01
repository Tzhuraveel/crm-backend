import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvironmentConfigService } from './environment-config.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
