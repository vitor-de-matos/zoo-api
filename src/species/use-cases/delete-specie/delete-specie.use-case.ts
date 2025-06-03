import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISpeciesRepo } from 'src/species/models/interface/species-repo.interface';

@Injectable()
export class DeleteSpeciesUseCase {
  constructor(
    @Inject('ISpeciesRepo')
    private readonly speciesRepository: ISpeciesRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const speciesRecord = await this.speciesRepository.findById(id);

    if (!speciesRecord) {
      throw new NotFoundException({
        message: 'Especie não encontrada',
      });
    }

    await this.speciesRepository.delete(id);
  }
}
