import { FindMedicalRecordUseCase } from './find-medical-record.use-case';
import { MedicalRecord } from 'src/medical-record/models/entity/medical-record.entity';
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

@ApiTags('Registro medico')
@ApiBearerAuth('access-token')
@Controller('medical-record')
export class FindMedicalRecordController {
  constructor(
    @Inject(FindMedicalRecordUseCase)
    private readonly medicalRecordService: FindMedicalRecordUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar registro medico' })
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'Registro medico não encontrado.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<MedicalRecord> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida. Entre em contato com o suporte.',
      });
    }
    return await this.medicalRecordService.find(id);
  }
}
