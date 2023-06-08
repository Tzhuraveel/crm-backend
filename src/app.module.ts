import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app';
import { TypeOrmConfigurations } from './config/db/type-orm-configuration';
import { CronModule } from './core/cron';
import { PassportWrapperModule } from './core/passport';
import { AuthModule } from './module/auth';
import { CommentModule } from './module/comment';
import { GroupModule } from './module/group';
import { OrderModule } from './module/order';
import { TokenModule } from './module/token';
import { UserModule } from './module/user';

@Module({
  imports: [
    PassportWrapperModule,
    TypeOrmModule.forRootAsync(TypeOrmConfigurations.config),
    ScheduleModule.forRoot(),
    AuthModule,
    AppConfigModule,
    TokenModule,
    CronModule,
    OrderModule,
    UserModule,
    GroupModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
