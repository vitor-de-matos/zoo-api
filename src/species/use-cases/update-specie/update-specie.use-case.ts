import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateSpeciesDTO } from 'src/species/models/dtos/update-species.dto';
import { Species } from 'src/species/models/entity/species.entity';
import { ISpeciesRepo } from 'src/species/models/interface/species-repo.interface';

@Injectable()
export class UpdateSpeciesUseCase {
  constructor(
    @Inject('ISpeciesRepo')
    private readonly speciesRepository: ISpeciesRepo,
  ) {}

  async update(
    speciesId: number,
    speciesDTO: UpdateSpeciesDTO,
  ): Promise<Species> {
    const species = await this.speciesRepository.findById(speciesId);
    if (!species) {
      throw new NotFoundException({
        message: 'especie não encontrada',
      });
    }

    const updated = await this.speciesRepository.update(speciesId, speciesDTO);
    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar registro de medidas no banco de dados',
      });
    }
    return updated;
  }
}
