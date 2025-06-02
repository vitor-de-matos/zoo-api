import { UpdateMedicalRecordUseCase } from './update-medical-record.use-case';
import { UpdateMedicalRecordDTO } from 'src/medical-record/models/dtos/update-medical-record.dto';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Inject,
  Param,
  Patch,
  Body,
} from '@nestjs/common';

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
