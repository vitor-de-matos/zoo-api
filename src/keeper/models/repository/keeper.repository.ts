import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateKeeperDTO } from '../dtos/create-keeper.dto';
import { UpdateKeeperDTO } from '../dtos/update-keeper.dto';
import { DB_PG_DATABASE } from 'src/shared/database/postgres.config';
import { FindKeeperDTO } from '../dtos/find-keeper.dto';
import { IKeeperRepo } from '../interface/keeper-repo.interface';
import { Keeper } from '../entity/keeper.entity';

@Injectable()
export class KeeperRepository implements IKeeperRepo {
  constructor(
    @InjectRepository(Keeper, DB_PG_DATABASE)
    private readonly repository: Repository<Keeper>,
  ) {}

  async create(keeperDTO: CreateKeeperDTO): Promise<number> {
    const result = await this.repository.save(keeperDTO);
    return result.id;
  }

  async find(filters: FindKeeperDTO): Promise<{
    data: Keeper[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<Keeper> = {
      where: {
        ...(filters.fullName && { fullName: ILike(`%${filters.fullName}%`) }),
        ...(filters.shift && { shift: filters.shift }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
      relations: { animals: true },
    };

    const [data, totalItems] = await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: data, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<Keeper | undefined> {
    const keeper = await this.repository.findOne({
      where: { id: id },
      relations: { animals: true },
    });
    if (!keeper) {
      throw new NotFoundException({
        message: 'Tratador não encontrado',
      });
    }
    return keeper;
  }

  async update(keeperId: number, keeperDTO: UpdateKeeperDTO): Promise<Keeper> {
    const keeper = await this.repository.findOne({
      where: { id: keeperId },
    });

    if (!keeper) {
      throw new NotFoundException({
        message: 'Tratador não encontrado',
      });
    }

    const UpdateKeeper = await this.repository.save({
      ...keeper,
      ...keeperDTO,
    });

    return UpdateKeeper;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
