import { UpdateFeedingScheduleDTO } from 'src/feeding-schedule/models/dtos/update-feeding-schedule.dto';
import { IFeedingScheduleRepo } from 'src/feeding-schedule/models/interface/feeding-schedule-repo.interface';
import { FeedingSchedule } from 'src/feeding-schedule/models/entity/feeding-schedule.entity';
import {
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Inject,
} from '@nestjs/common';

@Injectable()
export class UpdateFeedingScheduleUseCase {
  constructor(
    @Inject('IFeedingScheduleRepo')
    private readonly feedingScheduleRepository: IFeedingScheduleRepo,
  ) {}

  async update(
    feedingScheduleId: number,
    feedingScheduleDTO: UpdateFeedingScheduleDTO,
  ): Promise<FeedingSchedule> {
    const feedingSchedule =
      await this.feedingScheduleRepository.findById(feedingScheduleId);
    if (!feedingSchedule) {
      throw new NotFoundException({
        message: 'Horario de alimentação não encontrado',
      });
    }

    const updated = await this.feedingScheduleRepository.update(
      feedingScheduleId,
      feedingScheduleDTO,
    );
    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar horario de alimentação no banco de dados',
      });
    }
    return updated;
  }
}
