import { DeleteQuarentineRecordUseCase } from './delete-quarentine-record.use-case';
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

@ApiTags('Registro de quarentena')
@ApiBearerAuth('access-token')
@Controller('quarentine-record')
export class DeleteQuarentineRecordController {
  constructor(
    @Inject(DeleteQuarentineRecordUseCase)
    private readonly quarentineRecordService: DeleteQuarentineRecordUseCase,
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
    await this.quarentineRecordService.delete(id);
    return 'Registro medico removido com sucesso';
  }
}
