import { Injectable } from '@nestjs/common';

import { Comment } from '../../core/database/entities';
import { CommentResponseDto } from './model/dto';

@Injectable()
export class CommentMapper {
  public toResponse({ manager, ...comment }: Comment): CommentResponseDto {
    return {
      id: comment.id,
      comment: comment.comment,
      created_at: comment.created_at,
      manager: {
        id: manager.id,
        name: manager.name,
        surname: manager.surname,
      },
    };
  }
}
