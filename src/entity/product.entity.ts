import { BeforeUpdate, Column, Entity, OneToMany, UpdateDateColumn } from 'typeorm';
import { Inventory } from './inventory.entity';
import { MyBaseEntity } from './mybase.entity';


@Entity()
export class Product extends MyBaseEntity {
  @Column({ type: 'varchar', length: '255', nullable: true })
  sku_code: string;

  @Column({ type: 'varchar', length: '255', nullable: true })
  sku_name: string;

  @Column({ type: 'varchar', length: '255', nullable: true })
  owner_product: string;

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
}
