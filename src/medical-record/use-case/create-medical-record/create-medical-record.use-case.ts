import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateMedicalRecordDTO } from 'src/medical-record/models/dtos/create-medical-record.dto';
import { IMedicalRecordRepo } from 'src/medical-record/models/interface/medical-record-repo.interface';

@Injectable()
export class CreateMedicalRecordUseCase {
  constructor(
    @Inject('IMedicalRecordRepo')
    private readonly medicalRecordRepository: IMedicalRecordRepo,
  ) {}

  async create(medicalRecordDTO: CreateMedicalRecordDTO): Promise<number> {
    const medicalRecordCreated =
      await this.medicalRecordRepository.create(medicalRecordDTO);

    if (isNaN(medicalRecordCreated)) {
      throw new BadRequestException({
        message: 'Resposta inválida. Entre em contato com o suporte.',
      });
    }
    return medicalRecordCreated;
  }
}
