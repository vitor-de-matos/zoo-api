import { CreateKeeperDTO } from '../dtos/create-keeper.dto';
import { UpdateKeeperDTO } from '../dtos/update-keeper.dto';
import { FindKeeperDTO } from '../dtos/find-keeper.dto';
import { Keeper } from '../entity/keeper.entity';

export interface IKeeperRepo {
  create(keeperDTO: CreateKeeperDTO): Promise<number>;
  find(filters: FindKeeperDTO): Promise<{
    data: Keeper[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Keeper | undefined>;
  update(keeperId: number, keeperDTO: UpdateKeeperDTO): Promise<Keeper>;
  delete(id: number): Promise<void>;
}
