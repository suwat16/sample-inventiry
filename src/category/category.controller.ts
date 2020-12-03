import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async getCategory() {
    const data = await this.categoryService.getCategory();

    return { success: true, data: data };
  }
}
