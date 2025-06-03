import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Species } from 'src/species/models/entity/species.entity';
import { ISpeciesRepo } from 'src/species/models/interface/species-repo.interface';

@Injectable()
export class FindSpeciesUseCase {
  constructor(
    @Inject('ISpeciesRepo')
    private readonly specieRepository: ISpeciesRepo,
  ) {}

  async find(speciesId: number): Promise<Species> {
    const species = await this.specieRepository.findById(speciesId);
    if (!species) {
      throw new NotFoundException({
        message: 'Especie não encontrada',
      });
    }

    return species;
  }
}
