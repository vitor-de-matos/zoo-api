import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IMedicalRecordRepo } from 'src/medical-record/models/interface/medical-record-repo.interface';

@Injectable()
export class DeleteMedicalRecordUseCase {
  constructor(
    @Inject('IMedicalRecordRepo')
    private readonly medicalRecordRepository: IMedicalRecordRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const medicalRecord = await this.medicalRecordRepository.findById(id);

    if (!medicalRecord) {
      throw new NotFoundException({
        message: 'Registro medico não encontrado',
      });
    }

    await this.medicalRecordRepository.delete(id);
  }
}
