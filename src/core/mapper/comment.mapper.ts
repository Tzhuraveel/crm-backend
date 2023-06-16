import { Injectable } from '@nestjs/common';

import { CommentResponseDto } from '../../module/comment/model/dto';
import { Comment } from '../database/entities';

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
        is_active: manager.is_active,
        last_login: manager.last_login,
      },
    };
  }
}
