import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post(':id')
  async addQuantity(
    @Param('id', ParseIntPipe) id: number,
    @Body('quantity') quantity: number,
  ): Promise<any> {
    const data = await this.inventoryService.addQuantity(id, quantity);

    return { data: data };
  }
}
