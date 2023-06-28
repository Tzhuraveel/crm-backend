import { Module } from '@nestjs/common';

import { OrderModule } from '../order';
import { CommentController } from './comment.controller';
import { CommentMapper } from './comment.mapper';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  imports: [OrderModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, CommentMapper],
  exports: [CommentService, CommentRepository],
})
export class CommentModule {}
