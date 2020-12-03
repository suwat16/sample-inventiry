import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Category } from 'src/entity/category.entity';
import { Inventory } from 'src/entity/inventory.entity';
import { Product } from 'src/entity/product.entity';
import { CategoryRepository } from 'src/repository/category.repository';
import { ProductRepository } from 'src/repository/product.repository';
import { getConnection } from 'typeorm';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductFilterDto } from './dto/product-filter.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {
    this.init();
  }

  async getProduct(filter: ProductFilterDto): Promise<Product[]> {
    return await this.productRepository.getProductAndSearch(filter);
  }

  async addProduct(body: ProductCreateDto): Promise<Product> {
    try {
      const { sku_code, sku_name, category_id } = body;
      const find = await this.productRepository.findOne({
        where: { sku_code: sku_code },
      });

      if (find) throw new Error('duplicate item.');

      const findCategory = await this.categoryRepository.getCategoryById(
        category_id,
      );

      const product = new Product();
      product.sku_code = sku_code;
      product.sku_name = sku_name;
      product.category_id = findCategory;
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
      find.is_delete = true;
      await find.save();

      // const deleteData = await getConnection()
      //   .createQueryBuilder()

      //   .update()
      //   .from(Product)
      //   .set({})
      //   .where({ id: find.id })
      //   .execute();
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException();
    }
  }

  async init(): Promise<void> {
    try {
      const find = await this.categoryRepository.findOne({
        where: { name: 'uncategory' },
      });

      if (!find) {
        const _category = new Category();
        _category.name = 'uncategory';
        await _category.save();
      }
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException();
    }
  }
}
