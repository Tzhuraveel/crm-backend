import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TimeStamp } from './abstract.entity';
import { Orders } from './order.entity';

@Entity()
export class Group extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Orders, (order) => order.group)
  orders: Orders[];
}
