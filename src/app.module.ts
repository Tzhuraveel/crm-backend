import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { TypeOrmConfigurations } from './config/db/type-orm-configuration';
import { CronModule } from './core/cron';
import { PassportWrapperModule } from './core/strategy';
import { AuthModule } from './model/auth';
import { OrderModule } from './model/order';

@Module({
  imports: [
    AuthModule,
    AppConfigModule,
    TypeOrmModule.forRootAsync(TypeOrmConfigurations.config),
    CronModule,
    PassportWrapperModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
