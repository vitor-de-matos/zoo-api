import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateAnimalDTO } from 'src/animal/models/dto/create-animal.dto';
import { IAnimalRepo } from 'src/animal/models/interface/animal-repo.interface';

@Injectable()
export class CreateAnimalUseCase {
  constructor(
    @Inject('IAnimalRepo')
    private readonly animalRepository: IAnimalRepo,
  ) {}

  async create(animalDTO: CreateAnimalDTO): Promise<number> {
    const animalCreated = await this.animalRepository.create(animalDTO);

    if (isNaN(animalCreated)) {
      throw new BadRequestException({
        message: 'Resposta inválida. Entre em contato com o suporte.',
      });
    }
    return animalCreated;
  }
}
