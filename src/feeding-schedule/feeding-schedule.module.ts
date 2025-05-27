import { FindAllFeedingScheduleController } from './use-cases/find-all-feeding-schedule-filtered/find-all-feeding-schedule.controller';
import { CreateFeedingScheduleController } from './use-cases/create-feeding-schedule/create-feeding-schedule.controller';
import { UpdateFeedingScheduleController } from './use-cases/update-feeding-schedule/update-feeding-schedule.controller';
import { DeleteFeedingScheduleController } from './use-cases/delete-freeding-schedule/delete-feeding-schedule.controller';
import { FindAllFeedingScheduleUseCase } from './use-cases/find-all-feeding-schedule-filtered/find-all-feeding.schedule.use-case';
import { FindFeedingScheduleController } from './use-cases/find-feeding-schedule/find-feeding-schedule.controller';
import { DeleteFeedingScheduleUseCase } from './use-cases/delete-freeding-schedule/delete-feeding-schedule.use-case';
import { CreateFeedingScheduleUseCase } from './use-cases/create-feeding-schedule/create-feeding-schedule.use-case';
import { UpdateFeedingScheduleUseCase } from './use-cases/update-feeding-schedule/update-feeding-schedule.use-case';
import { FindFeedingScheduleUseCase } from './use-cases/find-feeding-schedule/find-feeding-schedule.use-case';
import { FeedingScheduleRepository } from './models/repository/feeding-schedule.repository';
import { FeedingSchedule } from './models/entity/feeding-schedule.entity';
import { DB_PG_DATABASE } from 'src/shared/database/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([FeedingSchedule], DB_PG_DATABASE),
    SharedModule,
  ],
  controllers: [
    CreateFeedingScheduleController,
    FindFeedingScheduleController,
    FindAllFeedingScheduleController,
    UpdateFeedingScheduleController,
    DeleteFeedingScheduleController,
  ],
  providers: [
    CreateFeedingScheduleUseCase,
    FindFeedingScheduleUseCase,
    FindAllFeedingScheduleUseCase,
    UpdateFeedingScheduleUseCase,
    DeleteFeedingScheduleUseCase,
    FeedingScheduleRepository,
    {
      provide: 'IFeedingScheduleRepo',
      useExisting: FeedingScheduleRepository,
    },
  ],
  exports: ['IFeedingScheduleRepo'],
})
export class FeedingScheduleModule {}
