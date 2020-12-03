import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Category } from 'src/entity/category.entity';
import { CategoryRepository } from 'src/repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategory(): Promise<Category[]> {
    return await this.categoryRepository.find({ relations: ['products'] });
  }
}
