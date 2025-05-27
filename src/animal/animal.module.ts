import { FindAllAnimalController } from './use-case/find-all-animal-filtered/find-all-animal.controller';
import { CreateAnimalController } from './use-case/create-animal/create-animal.controller';
import { UpdateAnimalController } from './use-case/update-animal/update-animal.controller';
import { DeleteAnimalController } from './use-case/delete-animal/delete-animal.controller';
import { FindAllAnimalUseCase } from './use-case/find-all-animal-filtered/find-all-animal.use-case';
import { CreateAnimalUseCase } from './use-case/create-animal/create-animal.use-case';
import { UpdateAnimalUseCase } from './use-case/update-animal/update-animal.use-case';
import { DeleteAnimalUseCase } from './use-case/delete-animal/delete-animal.use-case';
import { AnimalRepository } from './models/repository/animal.repository';
import { DB_PG_DATABASE } from 'src/shared/database/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Animal } from './models/entity/animal.entity';
import { Module } from '@nestjs/common';
import { FindAnimalController } from './use-case/find-animal/find-animal.controller';
import { FindAnimalUseCase } from './use-case/find-animal/find-animal.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Animal], DB_PG_DATABASE), SharedModule],
  controllers: [
    CreateAnimalController,
    FindAnimalController,
    FindAllAnimalController,
    UpdateAnimalController,
    DeleteAnimalController,
  ],
  providers: [
    CreateAnimalUseCase,
    FindAnimalUseCase,
    FindAllAnimalUseCase,
    UpdateAnimalUseCase,
    DeleteAnimalUseCase,
    AnimalRepository,
    {
      provide: 'IAnimalRepo',
      useExisting: AnimalRepository,
    },
  ],
  exports: ['IAnimalRepo'],
})
export class AnimalModule {}
