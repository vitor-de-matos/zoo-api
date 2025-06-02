import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabitatDTO } from '../dtos/create-habitat.dto';
import { UpdateHabitatDTO } from '../dtos/update-habitat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_PG_DATABASE } from 'src/shared/database/postgres.config';
import { FindHabitatDTO } from '../dtos/find-habitat.dto';
import { IHabitatRepo } from '../interface/habitat-repo.interface';
import { Habitat } from '../entity/habitat.entity';

@Injectable()
export class HabitatRepository implements IHabitatRepo {
  constructor(
    @InjectRepository(Habitat, DB_PG_DATABASE)
    private readonly repository: Repository<Habitat>,
  ) {}

  async create(habitatDTO: CreateHabitatDTO): Promise<number> {
    const result = await this.repository.save(habitatDTO);
    return result.id;
  }

  async find(filters: FindHabitatDTO): Promise<{
    data: Habitat[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<Habitat> = {
      where: {
        ...(filters.name && { notes: ILike(`%${filters.name}%`) }),
        ...(filters.environmentType && {
          environmentType: filters.environmentType,
        }),
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

  async findById(id: number): Promise<Habitat | undefined> {
    const feedingSchedule = await this.repository.findOne({
      where: { id: id },
      relations: { animals: true },
    });
    if (!feedingSchedule) {
      throw new NotFoundException({
        message: 'Tabela de comida não encontrada',
      });
    }
    return feedingSchedule;
  }

  async update(
    feedindScheduleId: number,
    feedingScheduleDTO: UpdateHabitatDTO,
  ): Promise<Habitat> {
    const feedingSchedule = await this.repository.findOne({
      where: { id: feedindScheduleId },
    });

    if (!feedingSchedule) {
      throw new NotFoundException({
        message: 'Tabela de comida não encontrada',
      });
    }

    const UpdateFeedingSchedule = await this.repository.save({
      ...feedingSchedule,
      ...feedingScheduleDTO,
    });

    return UpdateFeedingSchedule;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
