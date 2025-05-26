import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAnimalRepo } from 'src/animal/models/interface/animal-repo.interface';
import { Animal } from 'src/animal/models/entity/animal.entity';
import { FindAnimalDTO } from 'src/animal/models/dto/find-animal.dto';

@Injectable()
export class FindAllAnimalUseCase {
  constructor(
    @Inject('IAnimalRepo')
    private readonly animalRepository: IAnimalRepo,
  ) {}

  async find(animalDTO: FindAnimalDTO): Promise<{
    data: Animal[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const animal = await this.animalRepository.find(animalDTO);

    return animal;
  }
}
