import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateSpeciesDTO } from 'src/species/models/dtos/create-species.dto';
import { ISpeciesRepo } from 'src/species/models/interface/species-repo.interface';

@Injectable()
export class CreateSpeciesUseCase {
  constructor(
    @Inject('ISpeciesRepo')
    private readonly speciesRepository: ISpeciesRepo,
  ) {}

  async create(speciesdDTO: CreateSpeciesDTO): Promise<number> {
    const speciesCreated = await this.speciesRepository.create(speciesdDTO);

    if (isNaN(speciesCreated)) {
      throw new BadRequestException({
        message: 'Resposta inválida. Entre em contato com o suporte.',
      });
    }
    return speciesCreated;
  }
}
