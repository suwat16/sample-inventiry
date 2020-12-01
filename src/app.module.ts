import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { InventoryModule } from './inventory/inventory.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProductModule, InventoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
