import { Inventory } from 'src/entity/inventory.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {}
