import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TimeStamp } from './abstract.entity';

@Entity()
export class Token extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  accessToken: string;

  @Column({ type: 'varchar' })
  refreshToken: string;

  @Column({ type: 'int' })
  userId: number;
}
