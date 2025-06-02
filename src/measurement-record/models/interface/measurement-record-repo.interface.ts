import { CreateMeasurementRecordDTO } from '../dtos/create-measurement-record.dto';
import { UpdateMeasurementRecordDTO } from '../dtos/update-measurement-record.dto';
import { FindMeasurementRecordDTO } from '../dtos/find-measurement-record.dto';
import { MeasurementRecord } from '../entity/measurement-record.entity';

export interface IMeasurementRecordRepo {
  create(keeperDTO: CreateMeasurementRecordDTO): Promise<number>;
  find(filters: FindMeasurementRecordDTO): Promise<{
    data: MeasurementRecord[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<MeasurementRecord | undefined>;
  update(
    keeperId: number,
    keeperDTO: UpdateMeasurementRecordDTO,
  ): Promise<MeasurementRecord>;
  delete(id: number): Promise<void>;
}
