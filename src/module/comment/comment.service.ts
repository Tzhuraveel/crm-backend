import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Comment, User } from '../../core/database/entities';
import { OrderRepository } from '../order';
import { EStatus } from '../order/model/enum/course.enum';
import { CommentRepository } from './comment.repository';
import { CommentResponseDto } from './model/dto';

@Injectable()
export class CommentService {
  private changeComment({
    id,
    comment,
    createdAt,
    manager: { name, surname, id: managerId },
  }: Comment): CommentResponseDto {
    return {
      id,
      comment,
      createdAt,
      manager: { id: managerId, name, surname },
    };
  }

  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  public async add(comment: string, orderId: number, manager: User) {
    const orderFromDb = await this.orderRepository.findOrderWithManager(
      orderId,
    );

    if (!orderFromDb) {
      throw new HttpException('Order not found', HttpStatus.BAD_REQUEST);
    }

    const { manager: managerFromDb } = orderFromDb;

    if (managerFromDb && managerFromDb.id !== manager.id) {
      throw new HttpException(
        'This order is already handled by another manager',
        HttpStatus.FORBIDDEN,
      );
    }

    const [commentFromDb] = await Promise.all([
      this.commentRepository.save({
        comment,
        manager,
        order: orderId,
      }),
      this.orderRepository.update(orderId, {
        manager,
        status:
          orderFromDb.status === null || orderFromDb.status === EStatus.NEW
            ? EStatus.WORK
            : undefined,
      }),
    ]);

    return this.changeComment(commentFromDb);
  }

  public async delete(id: number, manager: User) {
    const commentFromDb = await this.commentRepository.findByIdWithManager(id);

    if (!commentFromDb) {
      throw new HttpException('Comment not found', HttpStatus.BAD_REQUEST);
    }

    const { manager: managerFromDb } = commentFromDb;

    if (managerFromDb && managerFromDb.id !== manager.id) {
      throw new HttpException(
        'This order is already handled by another manager',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.commentRepository.delete(id);
  }
}
