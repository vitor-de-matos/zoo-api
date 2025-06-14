import { UpdateMedicalRecordDTO } from 'src/medical-record/models/dtos/update-medical-record.dto';
import { IMedicalRecordRepo } from 'src/medical-record/models/interface/medical-record-repo.interface';
import { MedicalRecord } from 'src/medical-record/models/entity/medical-record.entity';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdateMedicalRecordUseCase {
  constructor(
    @Inject('IMedicalRecordRepo')
    private readonly medicalRecordRepository: IMedicalRecordRepo,
  ) {}

  async update(
    medicalRecordId: number,
    medicalRecordDTO: UpdateMedicalRecordDTO,
  ): Promise<MedicalRecord> {
    const medicalRecord =
      await this.medicalRecordRepository.findById(medicalRecordId);
    if (!medicalRecord) {
      throw new NotFoundException({
        message: 'Registro medico não encontrado',
      });
    }

    const updated = await this.medicalRecordRepository.update(
      medicalRecordId,
      medicalRecordDTO,
    );
    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar registro de medidas no banco de dados',
      });
    }
    return updated;
  }
}
