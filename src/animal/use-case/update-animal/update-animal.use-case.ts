import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateAnimalDTO } from 'src/animal/models/dto/update-animal.dto';
import { Animal } from 'src/animal/models/entity/animal.entity';
import { IAnimalRepo } from 'src/animal/models/interface/animal-repo.interface';

@Injectable()
export class UpdateAnimalUseCase {
  constructor(
    @Inject('IAnimalRepo')
    private readonly animalRepository: IAnimalRepo,
  ) {}

  async update(animalId: number, animalDTO: UpdateAnimalDTO): Promise<Animal> {
    const animal = await this.animalRepository.findById(animalId);
    if (!animal) {
      throw new NotFoundException({
        message: 'Animal não encontrado',
      });
    }

    const updated = await this.animalRepository.update(animalId, animalDTO);
    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar animal no banco de dados',
      });
    }
    return updated;
  }
}
