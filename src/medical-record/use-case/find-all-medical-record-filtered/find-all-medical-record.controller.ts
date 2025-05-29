import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindMedicalRecordDTO } from 'src/medical-record/models/dtos/find-medical-record.dto';
import { MedicalRecord } from 'src/medical-record/models/entity/medical-record.entity';
import { FindAllMedicalRecordUseCase } from './find-all-medical-record.use-case';

@ApiTags('Registro medico')
@ApiBearerAuth('access-token')
@Controller('medical-record')
export class FindAllMedicalRecordController {
  constructor(
    @Inject(FindAllMedicalRecordUseCase)
    private readonly medicalRecordService: FindAllMedicalRecordUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar registro medico' })
  @ApiOkResponse()
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() medicalRecordDTO: FindMedicalRecordDTO): Promise<{
    data: MedicalRecord[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.medicalRecordService.find(medicalRecordDTO);
  }
}
