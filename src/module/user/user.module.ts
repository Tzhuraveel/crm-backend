import { Module } from '@nestjs/common';

import { OrderModule } from '../order';
import { PageModule } from '../page';
import { UserController } from './user.controller';
import { UserMapper } from './user.mapper';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [OrderModule, PageModule],
  providers: [UserService, UserRepository, UserMapper],
  controllers: [UserController],
  exports: [UserService, UserRepository, UserMapper],
})
export class UserModule {}
