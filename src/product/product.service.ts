import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Inventory } from 'src/entity/inventory.entity';
import { Product } from 'src/entity/product.entity';
import { ProductRepository } from 'src/repository/product.repository';
import { getConnection } from 'typeorm';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductFilterDto } from './dto/product-filter.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProduct(filter: ProductFilterDto): Promise<Product[]> {
    return await this.productRepository.getProductAndSearch(filter);
  }

  async addProduct(body: ProductCreateDto): Promise<Product> {
    try {
      const { sku_code, sku_name } = body;
      const find = await this.productRepository.findOne({
        where: { sku_code: sku_code },
      });

      if (find) throw new Error('duplicate item.');
      const product = new Product();
      product.sku_code = sku_code;
      product.sku_name = sku_name;
      product.quantity = 0;
      const productData = await product.save();

      const inventory = new Inventory();
      inventory.quantity = 0;
      inventory.product_id = productData;
      const inventoryData = await inventory.save();

      return productData;
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async getById(id: number): Promise<Product> {
    return await this.productRepository.getProductById(id);
  }

  async updateProduct(id: number, body: ProductCreateDto): Promise<Product> {
    try {
      const { sku_code, sku_name } = body;
      const find = await this.productRepository.getProductById(id);

      find.sku_code = sku_code;
      find.sku_name = sku_name;
      const saveData = await find.save();

      return saveData;
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException();
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      const find = await this.productRepository.getProductById(id);

      const deleteData = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Product)
        .where({ id: find.id })
        .execute();
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException();
    }
  }
}
