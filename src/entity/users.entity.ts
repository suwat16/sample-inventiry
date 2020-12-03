import {
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { MyBaseEntity } from './mybase.entity';
import { Product } from './product.entity';

// @Entity()
export class Users extends MyBaseEntity {
  @Column({ type: 'uuid' })
  uuid: string;

  @Column({ type: 'varchar', length: '255' })
  username: string;

  @Column({ type: 'varchar', length: '255' })
  password: string;

  @Column({ type: 'varchar', length: '255' })
  title: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }

  @OneToMany(
    () => Product,
    product => product.id,
    { nullable: true },
  )
  products: Product[];
}
