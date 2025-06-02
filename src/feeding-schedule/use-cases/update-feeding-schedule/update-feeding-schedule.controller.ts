import { UpdateFeedingScheduleUseCase } from './update-feeding-schedule.use-case';
import { UpdateFeedingScheduleDTO } from 'src/feeding-schedule/models/dtos/update-feeding-schedule.dto';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Inject,
  Param,
  Patch,
  Body,
} from '@nestjs/common';

@ApiTags('Horario de alimentação')
@ApiBearerAuth('access-token')
@Controller('feeding-schedule')
export class UpdateFeedingScheduleController {
  constructor(
    @Inject(UpdateFeedingScheduleUseCase)
    private readonly feedingScheduleService: UpdateFeedingScheduleUseCase,
  ) {}

  @ApiOperation({ summary: 'Modificar horario de alimentação' })
  @ApiBody({ type: UpdateFeedingScheduleDTO })
  @ApiOkResponse({ description: 'Horario de alimentação atualizado' })
  @ApiNotFoundResponse({
    description: 'Horario de alimentação não encontrado.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() feedingScheduleDTO: UpdateFeedingScheduleDTO,
  ): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'ID deve ser um numero' });
    }
    await this.feedingScheduleService.update(id, feedingScheduleDTO);
    return 'Horario de alimentação atualizado';
  }
}
