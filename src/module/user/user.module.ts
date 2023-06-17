import { Module } from '@nestjs/common';

import { PageService } from '../page';
import { UserController } from './user.controller';
import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserRepository, UserMapper, PageService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
