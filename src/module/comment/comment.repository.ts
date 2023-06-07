import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Comment } from '../../core/database/entities';

@Injectable()
export class CommentRepository extends Repository<Comment> {
  constructor(private readonly dataSource: DataSource) {
    super(Comment, dataSource.manager);
  }

  public async findByIdWithManager(id: number) {
    return await this.findOne({
      where: { id },
      relations: {
        manager: true,
      },
    });
  }
}
