import { Injectable, NotFoundException } from '@nestjs/common';
import { IMedicalRecordRepo } from '../interface/medical-record-repo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalRecord } from '../entity/medical-record.entity';
import { DB_PG_DATABASE } from 'src/shared/database/postgres.config';
import { Between, FindManyOptions, ILike, Repository } from 'typeorm';
import { CreateMedicalRecordDTO } from '../dtos/create-medical-record.dto';
import { FindMedicalRecordDTO } from '../dtos/find-medical-record.dto';
import { endOfDay, startOfDay } from 'date-fns';
import { UpdateMedicalRecordDTO } from '../dtos/update-medical-record.dto';

@Injectable()
export class MedicalRecordRepository implements IMedicalRecordRepo {
  constructor(
    @InjectRepository(MedicalRecord, DB_PG_DATABASE)
    private readonly repository: Repository<MedicalRecord>,
  ) {}

  async create(medicalRecordDTO: CreateMedicalRecordDTO): Promise<number> {
    const result = await this.repository.save(medicalRecordDTO);
    return result.id;
  }

  async find(filters: FindMedicalRecordDTO): Promise<{
    data: MedicalRecord[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<MedicalRecord> = {
      where: {
        ...(filters.startDate !== undefined && filters.endDate !== undefined
          ? {
              date: Between(
                startOfDay(filters.startDate),
                endOfDay(filters.endDate),
              ),
            }
          : filters.startDate !== undefined
            ? { date: startOfDay(filters.startDate) }
            : filters.endDate !== undefined
              ? { date: endOfDay(filters.endDate) }
              : {}),
        ...(filters.diagnosis && {
          diagnosis: ILike(`%${filters.diagnosis}%`),
        }),
        ...(filters.animalId && { animal: { id: filters.animalId } }),
        ...(filters.quarentineId && {
          quarantine: { id: filters.quarentineId },
        }),
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

  async findById(id: number): Promise<MedicalRecord | undefined> {
    const medicalRecord = await this.repository.findOne({
      where: { id: id },
      relations: { animal: true },
    });
    if (!medicalRecord) {
      throw new NotFoundException({
        message: 'Registro medico não encontrado',
      });
    }
    return medicalRecord;
  }

  async update(
    medicalRecordId: number,
    medicalRecordDTO: UpdateMedicalRecordDTO,
  ): Promise<MedicalRecord> {
    const medicalRecord = await this.repository.findOne({
      where: { id: medicalRecordId },
    });

    if (!medicalRecord) {
      throw new NotFoundException({
        message: 'Registro medico não encontrado',
      });
    }

    const UpdatemedicalRecord = await this.repository.save({
      ...medicalRecord,
      ...medicalRecordDTO,
    });

    return UpdatemedicalRecord;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
