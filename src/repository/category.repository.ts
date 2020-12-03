import { NotFoundException } from '@nestjs/common';
import { Category } from 'src/entity/category.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async getCategoryById(id: number): Promise<Category> {
    try {
      const queryData = await this.findOne({
        where: { id: id },
      });

      if (!queryData) {
        return await this.findOne({ where: { name: 'uncategory' } });
      }
      return queryData;
    } catch (error) {
      console.log(error.message);
      throw new NotFoundException(error.message);
    }
  }
}
