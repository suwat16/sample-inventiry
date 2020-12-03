import { NotFoundException } from '@nestjs/common';
import { Product } from 'src/entity/product.entity';
import { ProductFilterDto } from 'src/product/dto/product-filter.dto';
import { EntityRepository, getConnection, Repository } from 'typeorm';

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

  async getProductAndSearch(filter: ProductFilterDto): Promise<Product[]> {
    try {
      const { sku_code, sku_name } = filter;
      const queryData = await getConnection()
        .createQueryBuilder(Product, 'product')
        .select(['id', 'sku_code', 'sku_name', 'quantity'])
        .where('is_delete = :is_delete', { is_delete: false });

      if (sku_code) {
        queryData.andWhere('sku_code ILIKE :sku_code', {
          sku_code: `%${sku_code}%`,
        });
      }

      if (sku_name) {
        queryData.andWhere('sku_name ILIKE :sku_name', {
          sku_name: `%${sku_name}%`,
        });
      }

      const data = await queryData.getRawMany();

      return data;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException(error.message);
    }
  }
}
