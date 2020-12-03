import { IsOptional, IsString } from 'class-validator';

export class ProductFilterDto {
  @IsString()
  @IsOptional()
  sku_code: string;

  @IsString()
  @IsOptional()
  sku_name: string;
}
