import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { MyBaseEntity } from './mybase.entity';
import { Product } from './product.entity';

@Entity()
export class Inventory extends MyBaseEntity {
  @Column({ type: 'int4' })
  quantity: number;

  @Column({ type: 'varchar', length: '255', nullable: true })
  user_action: string;

  @ManyToOne(
    () => Product,
    product => product.inventories,
  )
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;
}
