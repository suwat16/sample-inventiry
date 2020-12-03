import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Category } from 'src/entity/category.entity';

@Injectable()
export class CategoryService {
  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    try {
      const _category = new Category();
      _category.name = 'uncategory';
      await _category.save();
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException();
    }
  }
}
