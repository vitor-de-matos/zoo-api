import { UpdateKeeperDTO } from 'src/keeper/models/dtos/update-keeper.dto';
import { IKeeperRepo } from 'src/keeper/models/interface/keeper-repo.interface';
import { Keeper } from 'src/keeper/models/entity/keeper.entity';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdateKeeperUseCase {
  constructor(
    @Inject('IKeeperRepo')
    private readonly keeperRepository: IKeeperRepo,
  ) {}

  async update(keeperId: number, keeperDTO: UpdateKeeperDTO): Promise<Keeper> {
    const keeper = await this.keeperRepository.findById(keeperId);
    if (!keeper) {
      throw new NotFoundException({
        message: 'Tratador não encontrado',
      });
    }

    const updated = await this.keeperRepository.update(keeperId, keeperDTO);
    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar horario de alimentação no banco de dados',
      });
    }
    return updated;
  }
}
