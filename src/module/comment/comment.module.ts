import { Module } from '@nestjs/common';

import { OrderRepository } from '../order';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, OrderRepository, CommentRepository],
})
export class CommentModule {}
