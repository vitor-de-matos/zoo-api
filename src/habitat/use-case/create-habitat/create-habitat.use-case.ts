import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateHabitatDTO } from 'src/habitat/models/dtos/create-habitat.dto';
import { IHabitatRepo } from 'src/habitat/models/interface/habitat-repo.interface';

Injectable();
export class CreateHabitatUseCase {
  constructor(
    @Inject('IHabitatRepo')
    private readonly habitatRepository: IHabitatRepo,
  ) {}

  async create(habitatDTO: CreateHabitatDTO): Promise<number> {
    const habitatCreated = await this.habitatRepository.create(habitatDTO);

    if (isNaN(habitatCreated)) {
      throw new BadRequestException({
        message: 'Resposta inválida. Entre em contato com o suporte.',
      });
    }
    return habitatCreated;
  }
}
