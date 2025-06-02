import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuarantineRecord } from '../entity/quarentine-record.entity';
import { DB_PG_DATABASE } from 'src/shared/database/postgres.config';
import {
  FindManyOptions,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { IQuarentineRecordRepo } from '../interface/quarentine-repo.interface';
import { CreateQuarentineRecordDTO } from '../dtos/create-quarentine-record.dto';
import { FindQuarentineRecordDTO } from '../dtos/find-quarentine-record.dto';
import { endOfDay, startOfDay } from 'date-fns';
import { UpdateQuarentineRecordDTO } from '../dtos/update-quarentine-record.dto';

@Injectable()
export class QuarantineRecordRepository implements IQuarentineRecordRepo {
  constructor(
    @InjectRepository(QuarantineRecord, DB_PG_DATABASE)
    private readonly repository: Repository<QuarantineRecord>,
  ) {}

  async create(
    quarentineRecordDTO: CreateQuarentineRecordDTO,
  ): Promise<number> {
    const result = await this.repository.save(quarentineRecordDTO);
    return result.id;
  }

  async find(filters: FindQuarentineRecordDTO): Promise<{
    data: QuarantineRecord[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<QuarantineRecord> = {
      where: {
        ...(filters.startDate !== undefined && {
          startDate: LessThanOrEqual(startOfDay(filters.startDate)),
        }),
        ...(filters.endDate !== undefined && {
          endDate: MoreThanOrEqual(endOfDay(filters.endDate)),
        }),
        ...(filters.reason && {
          reason: ILike(`%${filters.reason}%`),
        }),
        ...(filters.location && { location: ILike(`%${filters.location}%`) }),
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

  async findById(id: number): Promise<QuarantineRecord | undefined> {
    const quarentineRecord = await this.repository.findOne({
      where: { id: id },
      relations: { animal: true },
    });
    if (!quarentineRecord) {
      throw new NotFoundException({
        message: 'Registro de quarentena não encontrada',
      });
    }
    return quarentineRecord;
  }

  async update(
    quarentineRecordId: number,
    quarentineRecordDTO: UpdateQuarentineRecordDTO,
  ): Promise<QuarantineRecord> {
    const quarentineRecord = await this.repository.findOne({
      where: { id: quarentineRecordId },
    });

    if (!quarentineRecord) {
      throw new NotFoundException({
        message: 'Nutrição não encontrada',
      });
    }

    const UpdateQuarentineRecord = await this.repository.save({
      ...quarentineRecord,
      ...quarentineRecordDTO,
    });

    return UpdateQuarentineRecord;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
