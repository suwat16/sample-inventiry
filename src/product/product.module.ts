import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from 'src/repository/product.repository';
import { CategoryRepository } from 'src/repository/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository, CategoryRepository])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
