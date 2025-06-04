import { Injectable, NotFoundException } from '@nestjs/common';
import { IMeasurementRecordRepo } from '../interface/measurement-record-repo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { MeasurementRecord } from '../entity/measurement-record.entity';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import {
  Between,
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CreateMeasurementRecordDTO } from '../dtos/create-measurement-record.dto';
import { FindMeasurementRecordDTO } from '../dtos/find-measurement-record.dto';
import { UpdateMeasurementRecordDTO } from '../dtos/update-measurement-record.dto';

@Injectable()
export class MeasurementRecordRepository implements IMeasurementRecordRepo {
  constructor(
    @InjectRepository(MeasurementRecord, DB_PG_DATABASE)
    private readonly repository: Repository<MeasurementRecord>,
  ) {}

  async create(keeperDTO: CreateMeasurementRecordDTO): Promise<number> {
    const result = await this.repository.save(keeperDTO);
    return result.id;
  }

  async find(filters: FindMeasurementRecordDTO): Promise<{
    data: MeasurementRecord[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<MeasurementRecord> = {
      where: {
        ...(filters.minWeightKg !== undefined &&
        filters.maxWeightKg !== undefined
          ? { weightKg: Between(filters.minWeightKg, filters.maxWeightKg) }
          : filters.minWeightKg !== undefined
            ? { weightKg: MoreThanOrEqual(filters.minWeightKg) }
            : filters.maxWeightKg !== undefined
              ? { weightKg: LessThanOrEqual(filters.maxWeightKg) }
              : {}),
        ...(filters.minHeightCm !== undefined &&
        filters.maxHeightCm !== undefined
          ? { heightCm: Between(filters.minHeightCm, filters.maxHeightCm) }
          : filters.minHeightCm !== undefined
            ? { heightCm: MoreThanOrEqual(filters.minHeightCm) }
            : filters.maxHeightCm !== undefined
              ? { heightCm: LessThanOrEqual(filters.maxHeightCm) }
              : {}),
        ...(filters.minBodyConditionScore !== undefined &&
        filters.maxBodyConditionScore !== undefined
          ? {
              bodyConditionScore: Between(
                filters.minBodyConditionScore,
                filters.maxBodyConditionScore,
              ),
            }
          : filters.minBodyConditionScore !== undefined
            ? {
                bodyConditionScore: MoreThanOrEqual(
                  filters.minBodyConditionScore,
                ),
              }
            : filters.maxBodyConditionScore !== undefined
              ? {
                  bodyConditionScore: LessThanOrEqual(
                    filters.maxBodyConditionScore,
                  ),
                }
              : {}),
        ...(filters.animalId && { animal: { id: filters.animalId } }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
      relations: { animal: true },
    };

    const [data, totalItems] = await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: data, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<MeasurementRecord | undefined> {
    const measurementRecord = await this.repository.findOne({
      where: { id: id },
      relations: { animal: true },
    });
    if (!measurementRecord) {
      throw new NotFoundException({
        message: 'Registro de medições não encontrado',
      });
    }
    return measurementRecord;
  }

  async update(
    measurementRecordId: number,
    measurementRecordDTO: UpdateMeasurementRecordDTO,
  ): Promise<MeasurementRecord> {
    const measurementRecord = await this.repository.findOne({
      where: { id: measurementRecordId },
    });

    if (!measurementRecord) {
      throw new NotFoundException({
        message: 'Registro de medições não encontrado',
      });
    }

    const UpdateKeeper = await this.repository.save({
      ...measurementRecord,
      ...measurementRecordDTO,
    });

    return UpdateKeeper;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
