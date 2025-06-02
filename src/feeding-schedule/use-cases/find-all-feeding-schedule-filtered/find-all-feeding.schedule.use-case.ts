import { FindFeedingScheduleDTO } from 'src/feeding-schedule/models/dtos/find-feeding-schedule.dto';
import { IFeedingScheduleRepo } from 'src/feeding-schedule/models/interface/feeding-schedule-repo.interface';
import { Inject, Injectable } from '@nestjs/common';
import { FeedingSchedule } from 'src/feeding-schedule/models/entity/feeding-schedule.entity';

@Injectable()
export class FindAllFeedingScheduleUseCase {
  constructor(
    @Inject('IFeedingScheduleRepo')
    private readonly feedingScheduleRepository: IFeedingScheduleRepo,
  ) {}

  async find(feedingScheduleDTO: FindFeedingScheduleDTO): Promise<{
    data: FeedingSchedule[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const feedingSchedule =
      await this.feedingScheduleRepository.find(feedingScheduleDTO);

    return feedingSchedule;
  }
}
