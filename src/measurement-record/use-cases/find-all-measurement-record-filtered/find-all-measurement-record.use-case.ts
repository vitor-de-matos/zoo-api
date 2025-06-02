import { FindMeasurementRecordDTO } from 'src/measurement-record/models/dtos/find-measurement-record.dto';
import { IMeasurementRecordRepo } from 'src/measurement-record/models/interface/measurement-record-repo.interface';
import { Inject, Injectable } from '@nestjs/common';
import { MeasurementRecord } from 'src/measurement-record/models/entity/measurement-record.entity';

@Injectable()
export class FindAllMeasurementRecordUseCase {
  constructor(
    @Inject('IMeasurementRecordRepo')
    private readonly measurementRecordRepository: IMeasurementRecordRepo,
  ) {}

  async find(measurementRecordDTO: FindMeasurementRecordDTO): Promise<{
    data: MeasurementRecord[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const measurementRecord =
      await this.measurementRecordRepository.find(measurementRecordDTO);

    return measurementRecord;
  }
}
