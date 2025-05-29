import {
  Body,
  Controller,
  Inject,
  NotAcceptableException,
  Param,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateMeasurementRecordUseCase } from './update-measurement-record.use-case';
import { UpdateMeasurementRecordDTO } from 'src/measurement-record/models/dtos/update-measurement-record.dto';

@ApiTags('Registro de medidas')
@ApiBearerAuth('access-token')
@Controller('measurement-record')
export class UpdateMeasurementRecordController {
  constructor(
    @Inject(UpdateMeasurementRecordUseCase)
    private readonly measurementRecordService: UpdateMeasurementRecordUseCase,
  ) {}

  @ApiOperation({ summary: 'Modificar registro de medidas' })
  @ApiBody({ type: UpdateMeasurementRecordDTO })
  @ApiOkResponse({ description: 'Registro de medidas atualizado' })
  @ApiNotFoundResponse({
    description: 'Registro de medidas não encontrado.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() measurementRecordDTO: UpdateMeasurementRecordDTO,
  ): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'ID deve ser um numero' });
    }
    await this.measurementRecordService.update(id, measurementRecordDTO);
    return 'Registro de medidas atualizado';
  }
}
