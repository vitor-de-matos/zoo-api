import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateKeeperDTO } from 'src/keeper/models/dtos/create-keeper.dto';
import { IKeeperRepo } from 'src/keeper/models/interface/keeper-repo.interface';

Injectable();
export class CreateKeeperUseCase {
  constructor(
    @Inject('IKeeperRepo')
    private readonly keeperRepository: IKeeperRepo,
  ) {}

  async create(keeperDTO: CreateKeeperDTO): Promise<number> {
    const keeperCreated = await this.keeperRepository.create(keeperDTO);

    if (isNaN(keeperCreated)) {
      throw new BadRequestException({
        message: 'Resposta inválida. Entre em contato com o suporte.',
      });
    }
    return keeperCreated;
  }
}
