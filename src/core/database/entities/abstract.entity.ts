import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class TimeStamp {
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
