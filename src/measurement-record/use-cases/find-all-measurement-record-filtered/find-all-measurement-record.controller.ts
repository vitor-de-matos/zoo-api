import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindAllMeasurementRecordUseCase } from './find-all-measurement-record.use-case';
import { FindMeasurementRecordDTO } from 'src/measurement-record/models/dtos/find-measurement-record.dto';
import { MeasurementRecord } from 'src/measurement-record/models/entity/measurement-record.entity';

@ApiTags('Registro de medidas')
@ApiBearerAuth('access-token')
@Controller('measurement-record')
export class FindAllMeasurementRecordController {
  constructor(
    @Inject(FindAllMeasurementRecordUseCase)
    private readonly measurementRecordService: FindAllMeasurementRecordUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar registro de medidas' })
  @ApiOkResponse()
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() measurementRecordDTO: FindMeasurementRecordDTO): Promise<{
    data: MeasurementRecord[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.measurementRecordService.find(measurementRecordDTO);
  }
}
