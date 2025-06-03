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
import { DeleteSpeciesUseCase } from './delete-specie.use-case';

@ApiTags('Especie')
@ApiBearerAuth('access-token')
@Controller('specie')
export class DeleteSpeciesController {
  constructor(
    @Inject(DeleteSpeciesUseCase)
    private readonly specieService: DeleteSpeciesUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir especie' })
  @ApiOkResponse({ description: 'Especie removida com sucesso' })
  @ApiNotFoundResponse({
    description: 'Especie não encontrada.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.specieService.delete(id);
    return 'Especie removida com sucesso';
  }
}
