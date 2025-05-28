import { Inject, Injectable } from '@nestjs/common';
import { FindKeeperDTO } from 'src/keeper/models/dtos/find-keeper.dto';
import { Keeper } from 'src/keeper/models/entity/keeper.entity';
import { IKeeperRepo } from 'src/keeper/models/interface/keeper-repo.interface';

@Injectable()
export class FindAllKeeperUseCase {
  constructor(
    @Inject('IKeeperRepo')
    private readonly keeperRepository: IKeeperRepo,
  ) {}

  async find(keeperDTO: FindKeeperDTO): Promise<{
    data: Keeper[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const keeper = await this.keeperRepository.find(keeperDTO);

    return keeper;
  }
}
