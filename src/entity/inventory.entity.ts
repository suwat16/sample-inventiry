import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { MyBaseEntity } from './mybase.entity';
import { Product } from './product.entity';
import { Users } from './users.entity';

@Entity()
export class Inventory extends MyBaseEntity {
  @Column({ type: 'int4' })
  quantity: number;

  @ManyToOne(
    () => Product,
    product => product.inventories,
  )
  @JoinColumn({
    name: 'product_id',
  })
  product_id: Product | number;

  @OneToOne(() => Users, { nullable: true })
  @JoinColumn({
    name: 'users_id',
  })
  users_id: Users | number;
}
