import { CreateFeedingScheduleDTO } from '../dtos/create-feeding-schedue.dto';
import { FindFeedingScheduleDTO } from '../dtos/find-feeding-schedule.dto';
import { UpdateFeedingScheduleDTO } from '../dtos/update-feeding-schedule.dto';
import { FeedingSchedule } from '../entity/feeding-schedule.entity';

export interface IFeedingScheduleRepo {
  create(feedingScheduleDTO: CreateFeedingScheduleDTO): Promise<number>;
  find(filters: FindFeedingScheduleDTO): Promise<{
    data: FeedingSchedule[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<FeedingSchedule | undefined>;
  update(
    feedingScheduleId: number,
    feedingScheduleDTO: UpdateFeedingScheduleDTO,
  ): Promise<FeedingSchedule>;
  delete(id: number): Promise<void>;
}
