import { CreateMedicalRecordDTO } from '../dtos/create-medical-record.dto';
import { FindMedicalRecordDTO } from '../dtos/find-medical-record.dto';
import { UpdateMedicalRecordDTO } from '../dtos/update-medical-record.dto';
import { MedicalRecord } from '../entity/medical-record.entity';

export interface IMedicalRecordRepo {
  create(medicalRecordDTO: CreateMedicalRecordDTO): Promise<number>;
  find(filters: FindMedicalRecordDTO): Promise<{
    data: MedicalRecord[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<MedicalRecord | undefined>;
  update(
    medicalRecordId: number,
    medicalRecordDTO: UpdateMedicalRecordDTO,
  ): Promise<MedicalRecord>;
  delete(id: number): Promise<void>;
}
