import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IHabitatRepo } from 'src/habitat/models/interface/habitat-repo.interface';

@Injectable()
export class DeleteHabitatUseCase {
  constructor(
    @Inject('IHabitatRepo')
    private readonly habitatRepository: IHabitatRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const habitat = await this.habitatRepository.findById(id);

    if (!habitat) {
      throw new NotFoundException({
        message: 'Habitate não encontrado',
      });
    }

    await this.habitatRepository.delete(id);
  }
}
