import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { TypeOrmConfigurations } from './config/db/type-orm-configuration';
import { AuthModule } from './model/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    AppConfigModule,
    TypeOrmModule.forRootAsync(TypeOrmConfigurations.config),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
