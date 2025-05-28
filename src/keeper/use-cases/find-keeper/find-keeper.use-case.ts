import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Keeper } from 'src/keeper/models/entity/keeper.entity';
import { IKeeperRepo } from 'src/keeper/models/interface/keeper-repo.interface';

@Injectable()
export class FindKeeperUseCase {
  constructor(
    @Inject('IKeeperRepo')
    private readonly keeperRepository: IKeeperRepo,
  ) {}

  async find(keeperId: number): Promise<Keeper> {
    const keeper = await this.keeperRepository.findById(keeperId);
    if (!keeper) {
      throw new NotFoundException({
        message: 'Tratador não encontrado',
      });
    }

    return keeper;
  }
}
