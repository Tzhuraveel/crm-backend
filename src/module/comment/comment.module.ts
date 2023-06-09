import { Module } from '@nestjs/common';

import { CommentMapper } from '../../core/mapper';
import { OrderRepository } from '../order';
import { CommentController } from './comment.controller';
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
})
export class CommentModule {}
