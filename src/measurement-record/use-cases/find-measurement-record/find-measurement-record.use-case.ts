import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MeasurementRecord } from 'src/measurement-record/models/entity/measurement-record.entity';
import { IMeasurementRecordRepo } from 'src/measurement-record/models/interface/measurement-record-repo.interface';

@Injectable()
export class FindMeasurementRecordUseCase {
  constructor(
    @Inject('IMeasurementRecordRepo')
    private readonly measurementRecordRepository: IMeasurementRecordRepo,
  ) {}

  async find(measurementRecordId: number): Promise<MeasurementRecord> {
    const measurementRecord =
      await this.measurementRecordRepository.findById(measurementRecordId);
    if (!measurementRecord) {
      throw new NotFoundException({
        message: 'Registro de medidas não encontrado',
      });
    }

    return measurementRecord;
  }
}
