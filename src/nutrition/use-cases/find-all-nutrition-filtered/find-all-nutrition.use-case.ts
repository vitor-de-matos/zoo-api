import { Inject, Injectable } from '@nestjs/common';
import { FindNutritionRecordDTO } from 'src/nutrition/models/dtos/find-nutrition.dto';
import { Nutrition } from 'src/nutrition/models/entity/nutrition.entity';
import { INutritionRepo } from 'src/nutrition/models/interface/nutrition-repo.interface';

@Injectable()
export class FindAllNutritionUseCase {
  constructor(
    @Inject('INutritionRepo')
    private readonly nutritionRepository: INutritionRepo,
  ) {}

  async find(nutritionRecordDTO: FindNutritionRecordDTO): Promise<{
    data: Nutrition[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const nutritionRecord =
      await this.nutritionRepository.find(nutritionRecordDTO);

    return nutritionRecord;
  }
}
