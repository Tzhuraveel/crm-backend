import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { EActionToken } from '../../../module/token/model/enum';
import { TimeStamp } from './abstract.entity';

@Entity()
export class ActionToken extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  @IsNotEmpty()
  userId: number;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  actionToken: string;

  @Column({ type: 'enum', enum: EActionToken })
  typeToken: EActionToken;
}
