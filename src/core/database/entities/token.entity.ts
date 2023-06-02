import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TimeStamp } from './abstract.entity';

@Entity()
export class Token extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  accessToken: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  refreshToken: string;

  @Column({ type: 'int' })
  @IsNotEmpty()
  userId: number;
}
