import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Inventory } from 'src/entity/inventory.entity';
import { Product } from 'src/entity/product.entity';
import { InventoryRepository } from 'src/repository/inventory.repository';
import { ProductRepository } from 'src/repository/product.repository';

@Injectable()
export class InventoryService {
  constructor(
    private readonly inventoryRepository: InventoryRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async addQuantity(id: number, quantity: number): Promise<Product> {
    try {
      const find = await this.productRepository.findOne({ where: { id: id } });
      if (!find) throw new Error('not found product id.');
      if (find.quantity + quantity < 0) throw new Error('not enough.');
      const result = find.quantity + quantity;

      const inventory = new Inventory();
      inventory.quantity = quantity;
      inventory.product_id = find;
      await inventory.save();

      find.quantity = result;
      const saveData = await find.save();
      return saveData;
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(error.message);
    }
  }
}
