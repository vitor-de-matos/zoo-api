import { DeleteAnimalUseCase } from './delete-animal.use-case';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
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

@ApiTags('Animal')
@ApiBearerAuth('access-token')
@Controller('animal')
export class DeleteAnimalController {
  constructor(
    @Inject(DeleteAnimalUseCase)
    private readonly animalService: DeleteAnimalUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir Animal' })
  @ApiOkResponse({ description: 'Animal removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Animal não encontrado.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.animalService.delete(id);
    return 'Animal removido com sucesso';
  }
}
