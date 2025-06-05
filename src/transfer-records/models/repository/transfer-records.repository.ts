import { Between, FindManyOptions, ILike, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransferRecordsDTO } from '../dtos/create-transfer-records.dto';
import { UpdateTransferRecordsDTO } from '../dtos/update-transfer-records.dto';
import { FindTransferRecordsDTO } from '../dtos/find-transfer-records.dto';
import { ITransferRecordsRepo } from '../interface/transfer-records.interface';
import { endOfDay, startOfDay } from 'date-fns';
import { InjectRepository } from '@nestjs/typeorm';
import { TransferRecords } from '../entity/transfer-records.entity';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';

@Injectable()
export class TransferRecordsRepository implements ITransferRecordsRepo {
  constructor(
    @InjectRepository(TransferRecords, DB_PG_DATABASE)
    private readonly repository: Repository<TransferRecords>,
  ) {}

  async create(transferRecordsDTO: CreateTransferRecordsDTO): Promise<number> {
    const result = await this.repository.save(transferRecordsDTO);
    return result.id;
  }

  async find(filters: FindTransferRecordsDTO): Promise<{
    data: TransferRecords[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<TransferRecords> = {
      where: {
        ...(filters.fromLocation && {
          fromLocation: ILike(`%${filters.fromLocation}%`),
        }),
        ...(filters.toLocation && {
          toLocation: ILike(`%${filters.toLocation}%`),
        }),
        ...(filters.minTransferDate !== undefined &&
        filters.maxTransferDate !== undefined
          ? {
              date: Between(
                startOfDay(filters.minTransferDate),
                endOfDay(filters.maxTransferDate),
              ),
            }
          : filters.minTransferDate !== undefined
            ? { date: startOfDay(filters.minTransferDate) }
            : filters.maxTransferDate !== undefined
              ? { date: endOfDay(filters.maxTransferDate) }
              : {}),
        ...(filters.animalId && { animal: { id: filters.animalId } }),
        ...(filters.keeperId && { keeper: { id: filters.keeperId } }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
      relations: { animal: true, keeper: true },
    };

    const [data, totalItems] = await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: data, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<TransferRecords | undefined> {
    const transferRecords = await this.repository.findOne({
      where: { id: id },
      relations: { animal: true, keeper: true },
    });
    if (!transferRecords) {
      throw new NotFoundException({
        message: 'Registro de transferencia não encontrado',
      });
    }
    return transferRecords;
  }

  async update(
    transferRecordsId: number,
    transferRecordsDTO: UpdateTransferRecordsDTO,
  ): Promise<TransferRecords> {
    const transferRecords = await this.repository.findOne({
      where: { id: transferRecordsId },
    });

    if (!transferRecords) {
      throw new NotFoundException({
        message: 'Registro de transferencia não encontrado',
      });
    }

    const UpdateTransferRecords = await this.repository.save({
      ...transferRecords,
      ...transferRecordsDTO,
    });

    return UpdateTransferRecords;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
