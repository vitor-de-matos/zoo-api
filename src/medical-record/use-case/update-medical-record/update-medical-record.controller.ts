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
import { UpdateMedicalRecordUseCase } from './update-medical-record.use-case';
import { UpdateMedicalRecordDTO } from 'src/medical-record/models/dtos/update-medical-record.dto';

@ApiTags('Registro medico')
@ApiBearerAuth('access-token')
@Controller('medical-record')
export class UpdateMedicalRecordController {
  constructor(
    @Inject(UpdateMedicalRecordUseCase)
    private readonly medicalRecordService: UpdateMedicalRecordUseCase,
  ) {}

  @ApiOperation({ summary: 'Modificar registro medico' })
  @ApiBody({ type: UpdateMedicalRecordDTO })
  @ApiOkResponse({ description: 'Registro medico atualizado' })
  @ApiNotFoundResponse({
    description: 'Registro medico não encontrado.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() medicalRecordDTO: UpdateMedicalRecordDTO,
  ): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'ID deve ser um numero' });
    }
    await this.medicalRecordService.update(id, medicalRecordDTO);
    return 'Registro medico atualizado';
  }
}
