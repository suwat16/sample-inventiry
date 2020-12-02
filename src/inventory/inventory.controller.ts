import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { InventoryCreateDto } from './dto/inventory-create.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post(':id')
  async addQuantity(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: InventoryCreateDto,
  ): Promise<any> {
    const data = await this.inventoryService.addQuantity(id, body);

    return { data: data };
  }
}
