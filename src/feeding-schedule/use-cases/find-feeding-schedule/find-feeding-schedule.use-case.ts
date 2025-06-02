import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IFeedingScheduleRepo } from 'src/feeding-schedule/models/interface/feeding-schedule-repo.interface';
import { FeedingSchedule } from 'src/feeding-schedule/models/entity/feeding-schedule.entity';

@Injectable()
export class FindFeedingScheduleUseCase {
  constructor(
    @Inject('IFeedingScheduleRepo')
    private readonly feedingScheduleRepository: IFeedingScheduleRepo,
  ) {}

  async find(feedingScheduleId: number): Promise<FeedingSchedule> {
    const feedingSchedule =
      await this.feedingScheduleRepository.findById(feedingScheduleId);
    if (!feedingSchedule) {
      throw new NotFoundException({
        message: 'Horario de alimentação não encontrado',
      });
    }

    return feedingSchedule;
  }
}
