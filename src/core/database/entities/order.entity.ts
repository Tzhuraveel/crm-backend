import { IsOptional, IsString } from 'class-validator';
import {
  Column,
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
} from '../../../module/order/model/enum/course.enum';
import { TimeStamp } from './abstract.entity';
import { Comment } from './comment.entity';
import { Group } from './group.entity';
import { User } from './user.entity';

@Entity()
export class Orders extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 25, nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  @IsOptional()
  @IsString()
  surname?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  @IsString()
  email?: string;

  @Column({ type: 'varchar', length: 12, nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  age?: number;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  sum?: number;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  alreadyPaid?: number;

  @Column({ type: 'enum', enum: ECourseType, nullable: true })
  @IsOptional()
  course_type?: ECourseType;

  @Column({ type: 'enum', enum: ECourseFormat, nullable: true })
  @IsOptional()
  course_format?: ECourseFormat;

  @Column({ type: 'enum', enum: ECourse, nullable: true })
  @IsOptional()
  course?: ECourse;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  utm?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  msg?: string;

  @Column({ type: 'enum', enum: EStatus, nullable: true })
  @IsOptional()
  status?: EStatus;

  @ManyToOne(() => User, (user) => user.orders, { nullable: true })
  @JoinColumn({ name: 'manager' })
  manager?: User;

  @ManyToOne(() => Group, (group) => group.orders, { nullable: true })
  @JoinColumn({ name: 'group' })
  group?: Group;

  @OneToMany(() => Comment, (comment) => comment.order, { nullable: true })
  comment?: Comment[];
}
