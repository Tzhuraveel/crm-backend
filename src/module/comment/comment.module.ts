import { Module } from '@nestjs/common';

import { OrderRepository } from '../order/order.repository';
import { CommentController } from './comment.controller';
import { CommentMapper } from './comment.mapper';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],
  providers: [
    CommentService,
    OrderRepository,
    CommentRepository,
    CommentMapper,
  ],
  exports: [CommentService, CommentRepository],
})
export class CommentModule {}
