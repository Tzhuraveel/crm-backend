import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Orders } from './order.entity';
import { User } from './user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250 })
  comment: string;

  @ManyToOne(() => Orders, (order) => order.comment)
  @JoinColumn({ name: 'orderId' })
  order: number;

  @ManyToOne(() => User, (user) => user.comment)
  @JoinColumn({ name: 'manager' })
  manager: User;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;
}
