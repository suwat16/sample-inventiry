import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger/dist/decorators/api-param.decorator';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { ProductService } from './product.service';

@Controller('product')
@UsePipes(new ValidationPipe())
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async getProduct(@Query() filter: ProductFilterDto): Promise<any> {
    const data = await this.productService.getProduct(filter);
    return { success: true, data: data };
  }

  @Post()
  async addProduct(@Body() body: ProductCreateDto): Promise<any> {
    const dataSave = await this.productService.addProduct(body);
    return { success: true, data: dataSave };
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, example: 12 })
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

    return { success: true, data: data };
  }

  @Delete(':id/delete')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    const data = await this.productService.deleteProduct(id);

    return { success: true, data: data };
  }
}
