import { DeleteNutritionUseCase } from './delete-nutrition.use-case';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Delete,
  Inject,
  Param,
} from '@nestjs/common';

@ApiTags('Nutrição')
@ApiBearerAuth('access-token')
@Controller('nutrition')
export class DeleteNutritionController {
  constructor(
    @Inject(DeleteNutritionUseCase)
    private readonly medicalRecordService: DeleteNutritionUseCase,
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
