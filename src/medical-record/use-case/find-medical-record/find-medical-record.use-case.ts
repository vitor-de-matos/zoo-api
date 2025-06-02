import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IMedicalRecordRepo } from 'src/medical-record/models/interface/medical-record-repo.interface';
import { MedicalRecord } from 'src/medical-record/models/entity/medical-record.entity';

@Injectable()
export class FindMedicalRecordUseCase {
  constructor(
    @Inject('IMedicalRecordRepo')
    private readonly medicalRecordRepository: IMedicalRecordRepo,
  ) {}

  async find(medicalRecordId: number): Promise<MedicalRecord> {
    const medicalRecord =
      await this.medicalRecordRepository.findById(medicalRecordId);
    if (!medicalRecord) {
      throw new NotFoundException({
        message: 'Registro medico não encontrado',
      });
    }

    return medicalRecord;
  }
}
