import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  ECourse,
  ECourseFormat,
  ECourseType,
  EStatus,
} from '../../../module/order/model/enum';
import { Comment } from './comment.entity';
import { Group } from './group.entity';
import { User } from './user.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 25, nullable: true, default: null })
  name?: string;

  @Column({ type: 'varchar', length: 25, nullable: true, default: null })
  surname?: string;

  @Column({ type: 'varchar', length: 100, nullable: true, default: null })
  email?: string;

  @Column({ type: 'varchar', length: 12, nullable: true, default: null })
  phone?: string;

  @Column({ type: 'int', nullable: true, default: null })
  age?: number;

  @Column({ type: 'varchar', length: 10, nullable: true, default: null })
  course?: ECourse;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: true,
    default: null,
  })
  course_format?: ECourseFormat;

  @Column({ type: 'varchar', length: 100, nullable: true, default: null })
  course_type?: ECourseType;

  @Column({ type: 'int', nullable: true, default: null })
  sum?: number;

  @Column({ type: 'int', nullable: true, default: null })
  alreadyPaid?: number;

  @CreateDateColumn({ name: 'created_at', default: null })
  created_at: Date;

  @Column({ type: 'varchar', length: 100, nullable: true, default: null })
  utm?: string;

  @Column({ type: 'varchar', length: 100, nullable: true, default: null })
  msg?: string;

  @Column({ type: 'varchar', length: 15, nullable: true, default: null })
  status?: EStatus;

  @ManyToOne(() => User, (user) => user.orders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'manager' })
  manager?: User;

  @ManyToOne(() => Group, (group) => group.orders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'group' })
  group?: Group;

  @OneToMany(() => Comment, (comment) => comment.order, { nullable: true })
  comment?: Comment[];
}
