import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  @IsNotEmpty()
  sku_code: string;

  @IsString()
  @IsOptional()
  sku_name: string;

  @IsNumber()
  @IsOptional()
  category_id: number;
}
