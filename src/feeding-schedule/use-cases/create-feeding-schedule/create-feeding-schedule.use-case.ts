import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateFeedingScheduleDTO } from 'src/feeding-schedule/models/dtos/create-feeding-schedue.dto';
import { IFeedingScheduleRepo } from 'src/feeding-schedule/models/interface/feeding-schedule-repo.interface';

Injectable();
export class CreateFeedingScheduleUseCase {
  constructor(
    @Inject('IFeedingScheduleRepo')
    private readonly feedingScheduleRepository: IFeedingScheduleRepo,
  ) {}

  async create(feedingScheduleDTO: CreateFeedingScheduleDTO): Promise<number> {
    const feedingScheduleCreated =
      await this.feedingScheduleRepository.create(feedingScheduleDTO);

    if (isNaN(feedingScheduleCreated)) {
      throw new BadRequestException({
        message: 'Resposta inválida. Entre em contato com o suporte.',
      });
    }
    return feedingScheduleCreated;
  }
}
