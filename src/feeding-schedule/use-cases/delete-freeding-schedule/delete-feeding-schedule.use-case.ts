import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IFeedingScheduleRepo } from 'src/feeding-schedule/models/interface/feeding-schedule-repo.interface';

@Injectable()
export class DeleteFeedingScheduleUseCase {
  constructor(
    @Inject('IFeedingScheduleRepo')
    private readonly feedingScheduleRepository: IFeedingScheduleRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const feedingSchedule = await this.feedingScheduleRepository.findById(id);

    if (!feedingSchedule) {
      throw new NotFoundException({
        message: 'Horario de alimentação não encontrado',
      });
    }

    await this.feedingScheduleRepository.delete(id);
  }
}
