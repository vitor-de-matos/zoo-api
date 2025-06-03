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
import { DeleteTransferRecordsUseCase } from './delete-transfer-records.use-case';

@ApiTags('Registro de transferencia')
@ApiBearerAuth('access-token')
@Controller('transfer-records')
export class DeleteTransferRecordsController {
  constructor(
    @Inject(DeleteTransferRecordsUseCase)
    private readonly transferRecordsService: DeleteTransferRecordsUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir registro de transferencia' })
  @ApiOkResponse({
    description: 'Registro de transferencia removido com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Registro de transferencia não encontrado.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.transferRecordsService.delete(id);
    return 'Registro de transferencia removido com sucesso';
  }
}
