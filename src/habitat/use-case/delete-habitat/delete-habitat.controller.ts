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
import { DeleteHabitatUseCase } from './delete-habitat.use-case';

@ApiTags('Habitate')
@ApiBearerAuth('access-token')
@Controller('habitat')
export class DeleteHabitatController {
  constructor(
    @Inject(DeleteHabitatUseCase)
    private readonly habitatService: DeleteHabitatUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir habitate' })
  @ApiOkResponse({ description: 'Habitate removido com sucesso' })
  @ApiNotFoundResponse({
    description: 'Habitate não encontrado.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.habitatService.delete(id);
    return 'Habitate removido com sucesso';
  }
}
