import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferRecords } from './models/entity/transfer-records.entity';
import { DB_PG_DATABASE } from 'src/shared/database/postgres.config';
import { SharedModule } from 'src/shared/shared.module';
import { CreateTransferRecordsController } from './use-cases/create-transfer-records/create-transfer-record.controller';
import { FindTransferRecordsController } from './use-cases/find-transfer-records/find-transfer-record.controller';
import { FindAllTransferRecordsUseCase } from './use-cases/find-all-transfer-records-filtered/find-all-transfer-record.use-case';
import { FindAllTransferRecordsController } from './use-cases/find-all-transfer-records-filtered/find-all-transfer-record.controller';
import { UpdateTransferRecordsController } from './use-cases/update-transfer-records/update-transfer-records.controller';
import { DeleteTransferRecordsController } from './use-cases/delete-transfer-records/delete-transfer-records.controller';
import { CreateTransferRecordsUseCase } from './use-cases/create-transfer-records/create-transfer-record.use-case';
import { FindTransferRecordUseCase as FindTransferRecordsUseCase } from './use-cases/find-transfer-records/find-transfer-record.use-case';
import { UpdateTransferRecordsUseCase } from './use-cases/update-transfer-records/update-transfer-records.use-case';
import { DeleteTransferRecordsUseCase } from './use-cases/delete-transfer-records/delete-transfer-records.use-case';
import { TransferRecordsRepository } from './models/repository/transfer-records.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransferRecords], DB_PG_DATABASE),
    SharedModule,
  ],
  controllers: [
    CreateTransferRecordsController,
    FindTransferRecordsController,
    FindAllTransferRecordsController,
    UpdateTransferRecordsController,
    DeleteTransferRecordsController,
  ],
  providers: [
    CreateTransferRecordsUseCase,
    FindTransferRecordsUseCase,
    FindAllTransferRecordsUseCase,
    UpdateTransferRecordsUseCase,
    DeleteTransferRecordsUseCase,
    TransferRecordsRepository,
    {
      provide: 'ITransferRecordsRepo',
      useExisting: TransferRecordsRepository,
    },
  ],
  exports: ['ITransferRecordsRepo'],
})
export class TransferRecordsModule {}
