import { DeleteFeedingScheduleUseCase } from './delete-feeding-schedule.use-case';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Delete,
  Inject,
  Param,
} from '@nestjs/common';

@ApiTags('Horario de alimentação')
@ApiBearerAuth('access-token')
@Controller('feeding-schedule')
export class DeleteFeedingScheduleController {
  constructor(
    @Inject(DeleteFeedingScheduleUseCase)
    private readonly feedingScheduleService: DeleteFeedingScheduleUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir horario de alimentação' })
  @ApiOkResponse({ description: 'Horario de alimentação removido com sucesso' })
  @ApiNotFoundResponse({
    description: 'Horario de alimentação não encontrado.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.feedingScheduleService.delete(id);
    return 'Horario de alimentação removido com sucesso';
  }
}
