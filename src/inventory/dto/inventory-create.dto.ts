import { IsNotEmpty, IsNumber } from 'class-validator';

export class InventoryCreateDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
