import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductService } from './product.service';

@Controller('product')
@UsePipes(new ValidationPipe())
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

  @Put(':id/update')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProductCreateDto,
  ) {
    const data = await this.productService.updateProduct(id, body);

    return { data: data };
  }

  @Delete(':id/delete')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    const data = await this.productService.deleteProduct(id);

    return { data: data };
  }
}
