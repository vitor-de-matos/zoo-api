import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateMeasurementRecordDTO } from 'src/measurement-record/models/dtos/update-measurement-record.dto';
import { MeasurementRecord } from 'src/measurement-record/models/entity/measurement-record.entity';
import { IMeasurementRecordRepo } from 'src/measurement-record/models/interface/measurement-record-repo.interface';

@Injectable()
export class UpdateMeasurementRecordUseCase {
  constructor(
    @Inject('IMeasurementRecordRepo')
    private readonly measurementRecordRepository: IMeasurementRecordRepo,
  ) {}

  async update(
    measurementRecordId: number,
    measurementRecordDTO: UpdateMeasurementRecordDTO,
  ): Promise<MeasurementRecord> {
    const measurementRecord =
      await this.measurementRecordRepository.findById(measurementRecordId);
    if (!measurementRecord) {
      throw new NotFoundException({
        message: 'Registro de medidas não encontrado',
      });
    }

    const updated = await this.measurementRecordRepository.update(
      measurementRecordId,
      measurementRecordDTO,
    );
    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar registro de medidas no banco de dados',
      });
    }
    return updated;
  }
}
