import { CreateMeasurementRecordUseCase } from './create-measutement-record.use-case';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateMeasurementRecordDTO } from 'src/measurement-record/models/dtos/create-measurement-record.dto';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

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
