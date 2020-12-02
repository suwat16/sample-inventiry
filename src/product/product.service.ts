import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Inventory } from 'src/entity/inventory.entity';
import { Product } from 'src/entity/product.entity';
import { ProductRepository } from 'src/repository/product.repository';
import { ProductCreateDto } from './dto/product-create.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProduct(): Promise<Product[]> {
    try {
      const queryData = await this.productRepository.find({
        select: ['id', 'sku_code', 'sku_name', 'quantity'],
      });

      return queryData;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException();
    }
  }

  async addProduct(body: ProductCreateDto): Promise<Product> {
    try {
      const { sku_code, sku_name } = body;
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
      throw new BadRequestException();
    }
  }
}
