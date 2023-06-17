import { Injectable } from '@nestjs/common';

import { Comment } from '../../core/database/entities';
import { CommentResponseDto } from './model/dto';

@Injectable()
export class CommentMapper {
  public toResponse({ manager, ...comment }: Comment): CommentResponseDto {
    return {
      id: comment.id,
      comment: comment.comment,
      createdAt: comment.createdAt,
      manager: {
        id: manager.id,
        name: manager.name,
        surname: manager.surname,
      },
    };
  }
}
