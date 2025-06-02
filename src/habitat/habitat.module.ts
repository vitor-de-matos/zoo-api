import { FindAllHabitatController } from './use-case/find-all-habitat-filtered/find-all-habitat.controller';
import { CreateHabitatController } from './use-case/create-habitat/create-habitat.controller';
import { UpdateHabitatController } from './use-case/update-habitat/update-habitat.controller';
import { DeleteHabitatController } from './use-case/delete-habitat/delete-habitat.controller';
import { FindAllHabitatUseCase } from './use-case/find-all-habitat-filtered/find-all-habitat.use-case';
import { FindHabitatController } from './use-case/find-habitat/find-habitat.controller';
import { CreateHabitatUseCase } from './use-case/create-habitat/create-habitat.use-case';
import { UpdateHabitatUseCase } from './use-case/update-habitat/update-habitat.use-case';
import { DeleteHabitatUseCase } from './use-case/delete-habitat/delete-habitat.use-case';
import { FindHabitatUseCase } from './use-case/find-habitat/find-habitat.use-case';
import { HabitatRepository } from './models/repository/habitat.repository';
import { DB_PG_DATABASE } from 'src/shared/database/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Habitat } from './models/entity/habitat.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Habitat], DB_PG_DATABASE), SharedModule],
  controllers: [
    CreateHabitatController,
    FindHabitatController,
    FindAllHabitatController,
    UpdateHabitatController,
    DeleteHabitatController,
  ],
  providers: [
    CreateHabitatUseCase,
    FindHabitatUseCase,
    FindAllHabitatUseCase,
    UpdateHabitatUseCase,
    DeleteHabitatUseCase,
    HabitatRepository,
    {
      provide: 'IHabitatRepo',
      useExisting: HabitatRepository,
    },
  ],
  exports: ['IHabitatRepo'],
})
export class HabitatModule {}
