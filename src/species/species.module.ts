import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from './models/entity/species.entity';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { SharedModule } from 'src/shared/shared.module';
import { CreateSpeciesController } from './use-cases/create-specie/create-specie.controller';
import { FindSpeciesController } from './use-cases/find-specie/find-specie.controller';
import { FindAllSpecieController } from './use-cases/find-all-specie-filtered/find-all-species.controller';
import { UpdateSpeciesController } from './use-cases/update-specie/update-specie.controller';
import { DeleteSpeciesController } from './use-cases/delete-specie/delete-specie.controller';
import { CreateSpeciesUseCase } from './use-cases/create-specie/create-specie.use-case';
import { FindSpeciesUseCase } from './use-cases/find-specie/find-specie.use-case';
import { FindAllSpeciesUseCase } from './use-cases/find-all-specie-filtered/find-all-species.use-case';
import { UpdateSpeciesUseCase } from './use-cases/update-specie/update-specie.use-case';
import { DeleteSpeciesUseCase } from './use-cases/delete-specie/delete-specie.use-case';
import { SpeciesRepository } from './models/repository/species.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Species], DB_PG_DATABASE), SharedModule],
  controllers: [
    CreateSpeciesController,
    FindSpeciesController,
    FindAllSpecieController,
    UpdateSpeciesController,
    DeleteSpeciesController,
  ],
  providers: [
    CreateSpeciesUseCase,
    FindSpeciesUseCase,
    FindAllSpeciesUseCase,
    UpdateSpeciesUseCase,
    DeleteSpeciesUseCase,
    SpeciesRepository,
    {
      provide: 'ISpeciesRepo',
      useExisting: SpeciesRepository,
    },
  ],
  exports: ['ISpeciesRepo'],
})
export class SpeciesModule {}
