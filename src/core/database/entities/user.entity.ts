import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { EUserRole } from '../../../module/user/model/enum/user-entity.enum';
import { Comment } from './comment.entity';
import { Orders } from './order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @Column({ type: 'varchar', length: 60 })
  @IsNotEmpty()
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: EUserRole })
  @IsNotEmpty()
  @IsEnum(EUserRole)
  role: EUserRole;

  @Column({ type: 'varchar', length: 100 })
  @IsNotEmpty()
  name: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  surname: string;

  @OneToMany(() => Orders, (order) => order.manager, { nullable: true })
  orders?: Orders[];

  @OneToMany(() => Comment, (comment) => comment.manager, { nullable: true })
  comment?: Orders[];
}
