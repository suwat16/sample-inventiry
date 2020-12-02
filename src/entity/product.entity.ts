import {
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Inventory } from './inventory.entity';
import { MyBaseEntity } from './mybase.entity';
import { Users } from './users.entity';

@Entity()
export class Product extends MyBaseEntity {
  @Column({ type: 'varchar', length: '255', nullable: true })
  sku_code: string;

  @Column({ type: 'varchar', length: '255', nullable: true })
  sku_name: string;

  @Column({ type: 'int4' })
  quantity: number;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = new Date();
  }

  @OneToMany(
    () => Inventory,
    inventory => inventory.id,
  )
  inventories: Inventory[];

  @ManyToOne(
    () => Users,
    users => users.products,
    { nullable: true },
  )
  @JoinColumn({
    name: 'users_id',
  })
  users_id: Users | number;
}
