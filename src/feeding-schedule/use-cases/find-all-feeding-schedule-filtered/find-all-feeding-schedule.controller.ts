import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindAllFeedingScheduleUseCase } from './find-all-feeding.schedule.use-case';
import { FindFeedingScheduleDTO } from 'src/feeding-schedule/models/dtos/find-feeding-schedule.dto';
import { FeedingSchedule } from 'src/feeding-schedule/models/entity/feeding-schedule.entity';

@ApiTags('Horario de alimentação')
@ApiBearerAuth('access-token')
@Controller('feeding-schedule')
export class FindAllFeedingScheduleController {
  constructor(
    @Inject(FindAllFeedingScheduleUseCase)
    private readonly feedingScheduleService: FindAllFeedingScheduleUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar horario de alimentação' })
  @ApiOkResponse()
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() feedingScheduleDTO: FindFeedingScheduleDTO): Promise<{
    data: FeedingSchedule[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.feedingScheduleService.find(feedingScheduleDTO);
  }
}
