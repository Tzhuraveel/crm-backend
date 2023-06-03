import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { TypeOrmConfigurations } from './config/db/type-orm-configuration';
import { CronModule } from './core/cron';
import { PassportWrapperModule } from './core/strategy';
import { AuthModule } from './module/auth';
import { OrderModule } from './module/order';
import { TokenModule } from './module/token';
import { UserModule } from './module/user';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmConfigurations.config),
    AuthModule,
    AppConfigModule,
    TokenModule,
    CronModule,
    PassportWrapperModule,
    OrderModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
