import { UpdateNutritionDTO } from 'src/nutrition/models/dtos/update-nutrition.dto';
import { INutritionRepo } from 'src/nutrition/models/interface/nutrition-repo.interface';
import { Nutrition } from 'src/nutrition/models/entity/nutrition.entity';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdateNutritionUseCase {
  constructor(
    @Inject('INutritionRepo')
    private readonly nutritionRepository: INutritionRepo,
  ) {}

  async update(
    nutritionId: number,
    nutritionDTO: UpdateNutritionDTO,
  ): Promise<Nutrition> {
    const nutrition = await this.nutritionRepository.findById(nutritionId);
    if (!nutrition) {
      throw new NotFoundException({
        message: 'Nutrição não encontrada',
      });
    }

    const updated = await this.nutritionRepository.update(
      nutritionId,
      nutritionDTO,
    );
    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar registro de medidas no banco de dados',
      });
    }
    return updated;
  }
}
