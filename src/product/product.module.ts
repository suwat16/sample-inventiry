import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from 'src/repository/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
