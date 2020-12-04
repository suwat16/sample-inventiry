import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'who001', required: true })
  sku_code: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, example: 'Iphone11', required: false })
  sku_name: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number, example: 1, required: false })
  category_id: number;
}
