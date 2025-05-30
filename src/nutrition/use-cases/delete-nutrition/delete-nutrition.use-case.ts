import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { INutritionRepo } from 'src/nutrition/models/interface/nutrition-repo.interface';

@Injectable()
export class DeleteNutritionUseCase {
  constructor(
    @Inject('INutritionRepo')
    private readonly nutritionRepository: INutritionRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const nutritionRecord = await this.nutritionRepository.findById(id);

    if (!nutritionRecord) {
      throw new NotFoundException({
        message: 'Nutrição não encontrado',
      });
    }

    await this.nutritionRepository.delete(id);
  }
}
