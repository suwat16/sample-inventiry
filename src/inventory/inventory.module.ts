import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from 'src/repository/product.repository';
import { InventoryRepository } from 'src/repository/inventory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository, InventoryRepository])],
  providers: [InventoryService],
  controllers: [InventoryController],
})
export class InventoryModule {}
