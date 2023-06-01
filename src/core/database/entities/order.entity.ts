import { IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ECourse, ECourseFormat, ECourseType, EUserStatus } from '../../enum';
import { Group } from './group.entity';
import { User } from './user.entity';

@Entity()
export class Orders {
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

  @Column({ type: 'enum', enum: ECourse, nullable: true })
  @IsOptional()
  @IsString()
  course?: ECourse;

  @Column({ type: 'enum', enum: ECourseFormat, nullable: true })
  @IsOptional()
  course_format?: ECourseFormat;

  @Column({ type: 'enum', enum: ECourseType, nullable: true })
  @IsOptional()
  course_type?: ECourseType;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  sum?: number;

  @Column({ type: 'int', nullable: true })
  @IsOptional()
  alreadyPaid?: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  utm?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @IsOptional()
  msg?: string;

  @Column({ type: 'enum', enum: EUserStatus, nullable: true })
  @IsOptional()
  status?: EUserStatus;

  @ManyToOne(() => User, (user) => user.orders)
  manager?: User;

  @ManyToOne(() => Group, (group) => group.orders)
  group?: Group;

  @CreateDateColumn({ name: 'createdAte' })
  createdAte: Date;
}
