import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProductCreateDto } from './dto/product-create.dto';
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
  async addProduct(@Body() body: ProductCreateDto): Promise<any> {
    const dataSave = await this.productService.addProduct(body);
    return { data: dataSave };
  }

  @Get(':id')
  async getByID(@Param('id', ParseIntPipe) id: number) {
    const data = await this.productService.getById(id);
    return { data: data };
  }
}
