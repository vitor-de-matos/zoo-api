import { FindNutritionRecordDTO } from '../dtos/find-nutrition.dto';
import { CreateNutritionDTO } from '../dtos/create-nutrition.dto';
import { UpdateNutritionDTO } from '../dtos/update-nutrition.dto';
import { Nutrition } from '../entity/nutrition.entity';

export interface INutritionRepo {
  create(nutritionDTO: CreateNutritionDTO): Promise<number>;
  find(filters: FindNutritionRecordDTO): Promise<{
    data: Nutrition[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Nutrition | undefined>;
  update(
    nutritionId: number,
    nutrirtionDTO: UpdateNutritionDTO,
  ): Promise<Nutrition>;
  delete(id: number): Promise<void>;
}
