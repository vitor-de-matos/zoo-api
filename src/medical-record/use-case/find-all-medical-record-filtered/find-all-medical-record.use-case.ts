import { Inject, Injectable } from '@nestjs/common';
import { FindMedicalRecordDTO } from 'src/medical-record/models/dtos/find-medical-record.dto';
import { MedicalRecord } from 'src/medical-record/models/entity/medical-record.entity';
import { IMedicalRecordRepo } from 'src/medical-record/models/interface/medical-record-repo.interface';

@Injectable()
export class FindAllMedicalRecordUseCase {
  constructor(
    @Inject('IMedicalRecordRepo')
    private readonly medicalRecordRepository: IMedicalRecordRepo,
  ) {}

  async find(medicalRecordDTO: FindMedicalRecordDTO): Promise<{
    data: MedicalRecord[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const medicalRecord =
      await this.medicalRecordRepository.find(medicalRecordDTO);

    return medicalRecord;
  }
}
