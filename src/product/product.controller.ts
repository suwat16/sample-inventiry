import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async getProduct(): Promise<any> {
    const data = await this.productService.getProduct();

    return { data: data };
  }

  @Post()
  async addProduct(@Body() body: any): Promise<any> {
    const dataSave = await this.productService.addProduct(body);
    return { data: dataSave };
  }
}
