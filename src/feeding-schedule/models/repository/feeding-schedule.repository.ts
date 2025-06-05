import { FindManyOptions, ILike, MoreThanOrEqual, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateFeedingScheduleDTO } from '../dtos/update-feeding-schedule.dto';
import { CreateFeedingScheduleDTO } from '../dtos/create-feeding-schedue.dto';
import { FindFeedingScheduleDTO } from '../dtos/find-feeding-schedule.dto';
import { IFeedingScheduleRepo } from '../interface/feeding-schedule-repo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedingSchedule } from '../entity/feeding-schedule.entity';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { startOfDay } from 'date-fns';

@Injectable()
export class FeedingScheduleRepository implements IFeedingScheduleRepo {
  constructor(
    @InjectRepository(FeedingSchedule, DB_PG_DATABASE)
    private readonly repository: Repository<FeedingSchedule>,
  ) {}

  async create(feedingScheduleDTO: CreateFeedingScheduleDTO): Promise<number> {
    const result = await this.repository.save(feedingScheduleDTO);
    return result.id;
  }

  async find(filters: FindFeedingScheduleDTO): Promise<{
    data: FeedingSchedule[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<FeedingSchedule> = {
      where: {
        ...(filters.time && {
          time: MoreThanOrEqual(startOfDay(filters.time)),
        }),
        ...(filters.notes && { notes: ILike(`%${filters.notes}%`) }),
        ...(filters.idNutrition && {
          nutrition: { id: filters.idNutrition },
        }),
        ...(filters.idSpecies && { species: { id: filters.idSpecies } }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
      relations: { nutrition: true, animal: true },
    };

    const [data, totalItems] = await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: data, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<FeedingSchedule | undefined> {
    const feedingSchedule = await this.repository.findOne({
      where: { id: id },
      relations: { nutrition: true, animal: true },
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
    feedingScheduleDTO: UpdateFeedingScheduleDTO,
  ): Promise<FeedingSchedule> {
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
