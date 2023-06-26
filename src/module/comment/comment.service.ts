import { Injectable, NotFoundException } from '@nestjs/common';

import { Comment, User } from '../../core/database/entities';
import { AnotherManagerException } from '../../core/exception';
import { EStatus } from '../order/model/enum';
import { OrderRepository } from '../order/order.repository';
import { CommentMapper } from './comment.mapper';
import { CommentRepository } from './comment.repository';
import { CommentResponseDto } from './model/dto';
@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly orderRepository: OrderRepository,
    private readonly commentMapper: CommentMapper,
  ) {}

  public async add(
    comment: string,
    orderId: number,
    manager: User,
  ): Promise<CommentResponseDto> {
    const orderFromDb = await this.orderRepository.findOrderWithManager(
      orderId,
    );

    if (!orderFromDb) throw new NotFoundException('Order not found');

    const { manager: managerFromDb } = orderFromDb;

    if (managerFromDb && managerFromDb.id !== manager.id)
      throw new AnotherManagerException();

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

    return this.commentMapper.toResponse(commentFromDb);
  }

  public async delete(id: number, manager: User): Promise<void> {
    const commentFromDb: Comment =
      await this.commentRepository.findByIdWithManager(id);

    if (!commentFromDb) throw new NotFoundException('Comment not found');

    const { manager: managerFromDb } = commentFromDb;

    if (managerFromDb && managerFromDb.id !== manager.id)
      throw new AnotherManagerException();

    await this.commentRepository.delete(id);
  }
}
