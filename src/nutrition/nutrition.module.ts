import { CreateNutritionController } from './use-cases/create-nutrition/create-nutrition.controller';
import { FindNutritionController } from './use-cases/find-nutrition/find-nutrition.controller';
import { FindAllNutritionController } from './use-cases/find-all-nutrition-filtered/find-all-nutrition.controller';
import { UpdateNutritionController } from './use-cases/update-nutrition/update-nutrition.controller';
import { FindNutritionUseCase } from './use-cases/find-nutrition/find-nutrition.use-case';
import { DeleteNutritionController } from './use-cases/delete-nutrition/delete-nutrition.controller';
import { CreateNutritionUseCase } from './use-cases/create-nutrition/create-nutrition.use-case';
import { FindAllNutritionUseCase } from './use-cases/find-all-nutrition-filtered/find-all-nutrition.use-case';
import { UpdateNutritionUseCase } from './use-cases/update-nutrition/update-nutrition.use-case';
import { DeleteNutritionUseCase } from './use-cases/delete-nutrition/delete-nutrition.use-case';
import { NutritionRepository } from './models/repository/nutrition.repository';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Nutrition } from './models/entity/nutrition.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([Nutrition], DB_PG_DATABASE),
    SharedModule,
  ],
  controllers: [
    CreateNutritionController,
    FindNutritionController,
    FindAllNutritionController,
    UpdateNutritionController,
    DeleteNutritionController,
  ],
  providers: [
    CreateNutritionUseCase,
    FindNutritionUseCase,
    FindAllNutritionUseCase,
    UpdateNutritionUseCase,
    DeleteNutritionUseCase,
    NutritionRepository,
    {
      provide: 'INutritionRepo',
      useExisting: NutritionRepository,
    },
  ],
  exports: ['INutritionRepo'],
})
export class NutritionModule {}
