import { FindFeedingScheduleUseCase } from './find-feeding-schedule.use-case';
import { FeedingSchedule } from 'src/feeding-schedule/models/entity/feeding-schedule.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Inject,
  Param,
  Get,
} from '@nestjs/common';

@ApiTags('Horario de alimentação')
@ApiBearerAuth('access-token')
@Controller('feeding-schedule')
export class FindFeedingScheduleController {
  constructor(
    @Inject(FindFeedingScheduleUseCase)
    private readonly feedingScheduleService: FindFeedingScheduleUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar horario de alimentação' })
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'Horario de alimentação não encontrado.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<FeedingSchedule> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida. Entre em contato com o suporte.',
      });
    }
    return await this.feedingScheduleService.find(id);
  }
}
