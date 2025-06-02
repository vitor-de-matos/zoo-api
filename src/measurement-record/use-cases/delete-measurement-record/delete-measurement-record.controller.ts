import { DeleteMeasurementRecordUseCase } from './delete-measurement-record.use-case';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
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

@ApiTags('Registro de medidas')
@ApiBearerAuth('access-token')
@Controller('measurement-record')
export class DeleteMeasurementRecordController {
  constructor(
    @Inject(DeleteMeasurementRecordUseCase)
    private readonly measurementRecordService: DeleteMeasurementRecordUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir registro de medidas' })
  @ApiOkResponse({ description: 'Registro de medidas removido com sucesso' })
  @ApiNotFoundResponse({
    description: 'Registro de medidas não encontrado.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.measurementRecordService.delete(id);
    return 'Registro de medidas removido com sucesso';
  }
}
