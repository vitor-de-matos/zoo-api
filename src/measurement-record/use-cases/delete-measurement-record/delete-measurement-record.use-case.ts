import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IMeasurementRecordRepo } from 'src/measurement-record/models/interface/measurement-record-repo.interface';

@Injectable()
export class DeleteMeasurementRecordUseCase {
  constructor(
    @Inject('IMeasurementRecordRepo')
    private readonly measurementRecordRepository: IMeasurementRecordRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const measurementRecordchedule =
      await this.measurementRecordRepository.findById(id);

    if (!measurementRecordchedule) {
      throw new NotFoundException({
        message: 'Registro de medidas não encontrado',
      });
    }

    await this.measurementRecordRepository.delete(id);
  }
}
