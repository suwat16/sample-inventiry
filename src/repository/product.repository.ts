import { Product } from 'src/entity/product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
