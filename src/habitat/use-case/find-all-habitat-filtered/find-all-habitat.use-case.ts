import { Inject, Injectable } from '@nestjs/common';
import { FindHabitatDTO } from 'src/habitat/models/dtos/find-habitat.dto';
import { Habitat } from 'src/habitat/models/entity/habitat.entity';
import { IHabitatRepo } from 'src/habitat/models/interface/habitat-repo.interface';

@Injectable()
export class FindAllHabitatUseCase {
  constructor(
    @Inject('IHabitatRepo')
    private readonly habitatRepository: IHabitatRepo,
  ) {}

  async find(habitatDTO: FindHabitatDTO): Promise<{
    data: Habitat[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const habitat = await this.habitatRepository.find(habitatDTO);

    return habitat;
  }
}
