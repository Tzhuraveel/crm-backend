import { Module } from '@nestjs/common';

import { CommentRepository } from '../comment/comment.repository';
import { GroupRepository } from '../group/group.repository';
import { PageService } from '../page';
import { UserRepository } from '../user/user.repository';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [
    PageService,
    OrderService,
    OrderRepository,
    CommentRepository,
    GroupRepository,
    UserRepository,
  ],
  exports: [OrderService],
})
export class OrderModule {}
