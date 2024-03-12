import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config/config';
import { TypeOrmConfigurations } from './config/db/type-orm-configuration';
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
import { UserModule } from './module/user';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    PassportWrapperModule,
    TypeOrmModule.forRootAsync(TypeOrmConfigurations.config),
    ScheduleModule.forRoot(),
    TokenModule,
    CronModule,
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
