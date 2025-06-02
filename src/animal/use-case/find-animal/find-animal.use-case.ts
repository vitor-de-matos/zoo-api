import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAnimalRepo } from 'src/animal/models/interface/animal-repo.interface';
import { Animal } from 'src/animal/models/entity/animal.entity';

@Injectable()
export class FindAnimalUseCase {
  constructor(
    @Inject('IAnimalRepo')
    private readonly animalRepository: IAnimalRepo,
  ) {}

  async find(animalId: number): Promise<Animal> {
    const animal = await this.animalRepository.findById(animalId);
    if (!animal) {
      throw new NotFoundException({ message: 'Animal não encontrado' });
    }

    return animal;
  }
}
