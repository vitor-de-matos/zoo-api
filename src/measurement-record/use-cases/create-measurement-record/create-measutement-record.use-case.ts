import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateMeasurementRecordDTO } from 'src/measurement-record/models/dtos/create-measurement-record.dto';
import { IMeasurementRecordRepo } from 'src/measurement-record/models/interface/measurement-record-repo.interface';

@Injectable()
export class CreateMeasurementRecordUseCase {
  constructor(
    @Inject('IMeasurementRecordRepo')
    private readonly measurementRecordRepository: IMeasurementRecordRepo,
  ) {}

  async create(
    measurementRecordDTO: CreateMeasurementRecordDTO,
  ): Promise<number> {
    const measurementRecordCreated =
      await this.measurementRecordRepository.create(measurementRecordDTO);

    if (isNaN(measurementRecordCreated)) {
      throw new BadRequestException({
        message: 'Resposta inválida. Entre em contato com o suporte.',
      });
    }
    return measurementRecordCreated;
  }
}
