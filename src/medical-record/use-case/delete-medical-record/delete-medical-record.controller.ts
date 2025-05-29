import {
  Controller,
  Delete,
  Inject,
  NotAcceptableException,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteMedicalRecordUseCase } from './delete-medical-record.use-case';

@ApiTags('Registro medico')
@ApiBearerAuth('access-token')
@Controller('medical-record')
export class DeleteMedicalRecordController {
  constructor(
    @Inject(DeleteMedicalRecordUseCase)
    private readonly medicalRecordService: DeleteMedicalRecordUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir registro medico' })
  @ApiOkResponse({ description: 'Registro medico removido com sucesso' })
  @ApiNotFoundResponse({
    description: 'Registro medico não encontrado.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.medicalRecordService.delete(id);
    return 'Registro medico removido com sucesso';
  }
}
