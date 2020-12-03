import { Column, Entity, OneToMany } from 'typeorm';
import { MyBaseEntity } from './mybase.entity';
import { Product } from './product.entity';

@Entity()
export class Category extends MyBaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(
    () => Product,
    product => product.category_id,
  )
  products: Product[];
}
