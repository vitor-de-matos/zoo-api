import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAnimalRepo } from 'src/animal/models/interface/animal-repo.interface';

@Injectable()
export class DeleteAnimalUseCase {
  constructor(
    @Inject('IAnimalRepo')
    private readonly animalRepository: IAnimalRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const animal = await this.animalRepository.findById(id);

    if (!animal) {
      throw new NotFoundException({ message: 'Animal não encontrado' });
    }

    await this.animalRepository.delete(id);
  }
}
