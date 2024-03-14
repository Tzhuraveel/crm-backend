import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { AppConfigModule } from './config/app';
import configuration from './config/config';
import { PassportWrapperModule } from './core/passport';
import { AdminModule } from './module/admin';
import { AuthModule } from './module/auth/auth.module';
import { CommentModule } from './module/comment';
import { CronModule } from './module/cron';
import { ExcelModule } from './module/excel';
import { GroupModule } from './module/group';
import { ManagementModule } from './module/management';
import { OrderModule } from './module/order';
import { TokenModule } from './module/token';
import { MySQLModule } from './module/typeorm';
import { UserModule } from './module/user';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    PassportWrapperModule,
    MySQLModule,
    ScheduleModule.forRoot(),
    TokenModule,
    CronModule,
    AuthModule,
    OrderModule,
    UserModule,
    GroupModule,
    CommentModule,
    AdminModule,
    ManagementModule,
    ExcelModule,
  ],
})
export class AppModule {}
