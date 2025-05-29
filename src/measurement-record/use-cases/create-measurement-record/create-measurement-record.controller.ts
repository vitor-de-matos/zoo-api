import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMeasurementRecordUseCase } from './create-measutement-record.use-case';
import { CreateMeasurementRecordDTO } from 'src/measurement-record/models/dtos/create-measurement-record.dto';

@ApiTags('Registro de medidas')
@ApiBearerAuth('access-token')
@Controller('measurement-record')
export class CreateMeasurementRecordController {
  constructor(
    @Inject(CreateMeasurementRecordUseCase)
    private readonly measurementRecordService: CreateMeasurementRecordUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar registro de medidas' })
  @ApiBody({ type: CreateMeasurementRecordDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(
    @Body() measurementRecordDTO: CreateMeasurementRecordDTO,
  ): Promise<number> {
    return await this.measurementRecordService.create(measurementRecordDTO);
  }
}
