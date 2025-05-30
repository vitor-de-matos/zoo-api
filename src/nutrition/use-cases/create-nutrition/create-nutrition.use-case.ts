import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateNutritionDTO } from 'src/nutrition/models/dtos/create-nutrition.dto';
import { INutritionRepo } from 'src/nutrition/models/interface/nutrition-repo.interface';

@Injectable()
export class CreateNutritionUseCase {
  constructor(
    @Inject('INutritionRepo')
    private readonly nutritionRepository: INutritionRepo,
  ) {}

  async create(nutritionDTO: CreateNutritionDTO): Promise<number> {
    const nutritionCreated =
      await this.nutritionRepository.create(nutritionDTO);

    if (isNaN(nutritionCreated)) {
      throw new BadRequestException({
        message: 'Resposta inválida. Entre em contato com o suporte.',
      });
    }
    return nutritionCreated;
  }
}
