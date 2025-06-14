import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateMedicalRecordUseCase } from './create-medical-record.use-case';
import { CreateMedicalRecordDTO } from 'src/medical-record/models/dtos/create-medical-record.dto';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Registro medico')
@ApiBearerAuth('access-token')
@Controller('medical-record')
export class CreateMedicalRecordController {
  constructor(
    @Inject(CreateMedicalRecordUseCase)
    private readonly medicalRecordService: CreateMedicalRecordUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar registro medico' })
  @ApiBody({ type: CreateMedicalRecordDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(
    @Body() medicalRecordDTO: CreateMedicalRecordDTO,
  ): Promise<number> {
    return await this.medicalRecordService.create(medicalRecordDTO);
  }
}
