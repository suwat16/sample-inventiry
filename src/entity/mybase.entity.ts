import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class MyBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int4' })
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
