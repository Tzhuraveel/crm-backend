import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class TimeStamp {
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
