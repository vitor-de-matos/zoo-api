import { FindAllMeasurementRecordController } from './use-cases/find-all-measurement-record-filtered/find-all-measurement-record.controller';
import { CreateMeasurementRecordController } from './use-cases/create-measurement-record/create-measurement-record.controller';
import { UpdateMeasurementRecordController } from './use-cases/update-measurement-record/update-measurement-record.controller';
import { DeleteMeasurementRecordController } from './use-cases/delete-measurement-record/delete-measurement-record.controller';
import { FindAllMeasurementRecordUseCase } from './use-cases/find-all-measurement-record-filtered/find-all-measurement-record.use-case';
import { FindMeasurementRecordController } from './use-cases/find-measurement-record/find-measurement-record.controller';
import { CreateMeasurementRecordUseCase } from './use-cases/create-measurement-record/create-measutement-record.use-case';
import { UpdateMeasurementRecordUseCase } from './use-cases/update-measurement-record/update-measurement-record.use-case';
import { DeleteMeasurementRecordUseCase } from './use-cases/delete-measurement-record/delete-measurement-record.use-case';
import { FindMeasurementRecordUseCase } from './use-cases/find-measurement-record/find-measurement-record.use-case';
import { MeasurementRecordRepository } from './models/repository/measurement-record.repository';
import { MeasurementRecord } from './models/entity/measurement-record.entity';
import { DB_PG_DATABASE } from 'src/shared/database/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([MeasurementRecord], DB_PG_DATABASE),
    SharedModule,
  ],
  controllers: [
    CreateMeasurementRecordController,
    FindMeasurementRecordController,
    FindAllMeasurementRecordController,
    UpdateMeasurementRecordController,
    DeleteMeasurementRecordController,
  ],
  providers: [
    CreateMeasurementRecordUseCase,
    FindMeasurementRecordUseCase,
    FindAllMeasurementRecordUseCase,
    UpdateMeasurementRecordUseCase,
    DeleteMeasurementRecordUseCase,
    MeasurementRecordRepository,
    {
      provide: 'IMeasurementRecordRepo',
      useExisting: MeasurementRecordRepository,
    },
  ],
  exports: ['IMeasurementRecordRepo'],
})
export class MeasurementRecordModule {}
