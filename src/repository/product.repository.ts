import { NotFoundException } from '@nestjs/common';
import { Product } from 'src/entity/product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async getProductById(id: number): Promise<Product> {
    try {
      const data = await this.findOne({
        select: ['id', 'sku_code', 'sku_name', 'quantity'],
        where: { id: id },
      });
      if (!data) throw new Error('not found id.');

      return data;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException(error.message);
    }
  }
}
