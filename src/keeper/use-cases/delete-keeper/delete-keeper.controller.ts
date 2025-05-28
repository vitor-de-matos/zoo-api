import { DeleteKeeperUseCase } from './delete-keeper.use-case';
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

@ApiTags('Tratador')
@ApiBearerAuth('access-token')
@Controller('keeper')
export class DeleteKeeperController {
  constructor(
    @Inject(DeleteKeeperUseCase)
    private readonly keeperService: DeleteKeeperUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir tratador' })
  @ApiOkResponse({ description: 'Tratador removido com sucesso' })
  @ApiNotFoundResponse({
    description: 'Tratador não encontrado.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.keeperService.delete(id);
    return 'Habitate removido com sucesso';
  }
}
