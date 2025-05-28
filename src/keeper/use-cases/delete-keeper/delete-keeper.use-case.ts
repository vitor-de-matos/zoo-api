import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IKeeperRepo } from 'src/keeper/models/interface/keeper-repo.interface';

@Injectable()
export class DeleteKeeperUseCase {
  constructor(
    @Inject('IKeeperRepo')
    private readonly keeperRepository: IKeeperRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const keeper = await this.keeperRepository.findById(id);

    if (!keeper) {
      throw new NotFoundException({
        message: 'Tratador não encontrado',
      });
    }

    await this.keeperRepository.delete(id);
  }
}
