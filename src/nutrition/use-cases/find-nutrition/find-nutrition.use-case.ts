import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { INutritionRepo } from 'src/nutrition/models/interface/nutrition-repo.interface';
import { Nutrition } from 'src/nutrition/models/entity/nutrition.entity';

@Injectable()
export class FindNutritionUseCase {
  constructor(
    @Inject('INutritionRepo')
    private readonly nutritionRepository: INutritionRepo,
  ) {}

  async find(nutritionId: number): Promise<Nutrition> {
    const nutrition = await this.nutritionRepository.findById(nutritionId);
    if (!nutrition) {
      throw new NotFoundException({
        message: 'Nutrição não encontrado',
      });
    }

    return nutrition;
  }
}
