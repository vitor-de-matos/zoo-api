import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Habitat } from 'src/habitat/models/entity/habitat.entity';
import { IHabitatRepo } from 'src/habitat/models/interface/habitat-repo.interface';

@Injectable()
export class FindHabitatUseCase {
  constructor(
    @Inject('IHabitatRepo')
    private readonly habitatRepository: IHabitatRepo,
  ) {}

  async find(habitatId: number): Promise<Habitat> {
    const habitat = await this.habitatRepository.findById(habitatId);
    if (!habitat) {
      throw new NotFoundException({
        message: 'Habitate não encontrado',
      });
    }

    return habitat;
  }
}
