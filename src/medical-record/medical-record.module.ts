import { FindAllMedicalRecordController } from './use-case/find-all-medical-record-filtered/find-all-medical-record.controller';
import { CreateMedicalRecordController } from './use-case/create-medical-record/create-medical-record.controller';
import { UpdateMedicalRecordController } from './use-case/update-medical-record/update-medical-record.controller';
import { DeleteMedicalRecordController } from './use-case/delete-medical-record/delete-medical-record.controller';
import { FindAllMedicalRecordUseCase } from './use-case/find-all-medical-record-filtered/find-all-medical-record.use-case';
import { FindMedicalRecordController } from './use-case/find-medical-record/find-medical-record.controller';
import { CreateMedicalRecordUseCase } from './use-case/create-medical-record/create-medical-record.use-case';
import { UpdateMedicalRecordUseCase } from './use-case/update-medical-record/update-medical-record.use-case';
import { DeleteMedicalRecordUseCase } from './use-case/delete-medical-record/delete-medical-record.use-case';
import { FindMedicalRecordUseCase } from './use-case/find-medical-record/find-medical-record.use-case';
import { MedicalRecordRepository } from './models/repository/medical-record.repository';
import { DB_PG_DATABASE } from 'src/shared/database/postgres.config';
import { MedicalRecord } from './models/entity/medical-record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalRecord], DB_PG_DATABASE),
    SharedModule,
  ],
  controllers: [
    CreateMedicalRecordController,
    FindMedicalRecordController,
    FindAllMedicalRecordController,
    UpdateMedicalRecordController,
    DeleteMedicalRecordController,
  ],
  providers: [
    CreateMedicalRecordUseCase,
    FindMedicalRecordUseCase,
    FindAllMedicalRecordUseCase,
    UpdateMedicalRecordUseCase,
    DeleteMedicalRecordUseCase,
    MedicalRecordRepository,
    {
      provide: 'IMedicalRecordRepo',
      useExisting: MedicalRecordRepository,
    },
  ],
  exports: ['IMedicalRecordRepo'],
})
export class MedicalRecordModule {}
