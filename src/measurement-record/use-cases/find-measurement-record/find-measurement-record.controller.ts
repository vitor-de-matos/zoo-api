import { FindMeasurementRecordUseCase } from './find-measurement-record.use-case';
import { MeasurementRecord } from 'src/measurement-record/models/entity/measurement-record.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
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

@ApiTags('Registro de medidas')
@ApiBearerAuth('access-token')
@Controller('measurement-record')
export class FindMeasurementRecordController {
  constructor(
    @Inject(FindMeasurementRecordUseCase)
    private readonly measurementRecordService: FindMeasurementRecordUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar registro de medidas' })
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'Registro de medidas não encontrado.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<MeasurementRecord> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida. Entre em contato com o suporte.',
      });
    }
    return await this.measurementRecordService.find(id);
  }
}
