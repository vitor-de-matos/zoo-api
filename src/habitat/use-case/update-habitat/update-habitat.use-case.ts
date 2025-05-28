import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateHabitatDTO } from 'src/habitat/models/dtos/update-habitat.dto';
import { Habitat } from 'src/habitat/models/entity/habitat.entity';
import { IHabitatRepo } from 'src/habitat/models/interface/habitat-repo.interface';

@Injectable()
export class UpdateHabitatUseCase {
  constructor(
    @Inject('IHabitatRepo')
    private readonly habitatRepository: IHabitatRepo,
  ) {}

  async update(
    habitatId: number,
    habitatDTO: UpdateHabitatDTO,
  ): Promise<Habitat> {
    const habitat = await this.habitatRepository.findById(habitatId);
    if (!habitat) {
      throw new NotFoundException({
        message: 'Habitate não encontrado',
      });
    }

    const updated = await this.habitatRepository.update(habitatId, habitatDTO);
    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar horario de alimentação no banco de dados',
      });
    }
    return updated;
  }
}
