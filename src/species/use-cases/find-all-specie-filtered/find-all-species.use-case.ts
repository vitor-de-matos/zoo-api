import { Inject, Injectable } from '@nestjs/common';
import { FindSpeciesDTO } from 'src/species/models/dtos/find-species.dto';
import { Species } from 'src/species/models/entity/species.entity';
import { ISpeciesRepo } from 'src/species/models/interface/species-repo.interface';

@Injectable()
export class FindAllSpeciesUseCase {
  constructor(
    @Inject('ISpeciesRepo')
    private readonly speciesRepository: ISpeciesRepo,
  ) {}

  async find(speciesDTO: FindSpeciesDTO): Promise<{
    data: Species[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const speciesRecord = await this.speciesRepository.find(speciesDTO);

    return speciesRecord;
  }
}
