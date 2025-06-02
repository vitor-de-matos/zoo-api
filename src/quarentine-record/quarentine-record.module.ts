import { FindAllQuarentineRecordController } from './use-cases/find-all-quarentine-record-filtered/find-all-quarentine-record.controller';
import { CreateQuarentineRecordController } from './use-cases/create-quarentine-record/create-quarentine-record.controller';
import { UpdateQuarentineRecordController } from './use-cases/update-quarentine-record/update-quarentine-record.controller';
import { DeleteQuarentineRecordController } from './use-cases/delete-quarentine-record/delete-quarentine-record.controller';
import { FindAllQuarentineRecordUseCase } from './use-cases/find-all-quarentine-record-filtered/find-all-quarentine-record.use-case';
import { FindQuarentineRecordController } from './use-cases/find-quarentine-record/find-quarentine-record.controller';
import { UpdateQuarentineRecordUseCase } from './use-cases/update-quarentine-record/update-quarentine-record.use-case';
import { CreateQuarentineRecordUseCase } from './use-cases/create-quarentine-record/create-quarentine-record.use-case';
import { DeleteQuarentineRecordUseCase } from './use-cases/delete-quarentine-record/delete-quarentine-record.use-case';
import { FindQuarentineRecordUseCase } from './use-cases/find-quarentine-record/find-quarentine-record.use-case';
import { QuarantineRecordRepository } from './models/repository/quarentine-record.repository';
import { QuarantineRecord } from './models/entity/quarentine-record.entity';
import { DB_PG_DATABASE } from 'src/shared/database/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuarantineRecord], DB_PG_DATABASE),
    SharedModule,
  ],
  controllers: [
    CreateQuarentineRecordController,
    FindQuarentineRecordController,
    FindAllQuarentineRecordController,
    UpdateQuarentineRecordController,
    DeleteQuarentineRecordController,
  ],
  providers: [
    CreateQuarentineRecordUseCase,
    FindQuarentineRecordUseCase,
    FindAllQuarentineRecordUseCase,
    UpdateQuarentineRecordUseCase,
    DeleteQuarentineRecordUseCase,
    QuarantineRecordRepository,
    {
      provide: 'IQuarentineRecordRepo',
      useExisting: QuarantineRecordRepository,
    },
  ],
  exports: ['IQuarentineRecordRepo'],
})
export class QuarentineRecordModule {}
