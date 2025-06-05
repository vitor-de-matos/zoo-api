import { UpdateTransferRecordsUseCase } from './update-transfer-records.use-case';
import { UpdateTransferRecordsDTO } from 'src/transfer-records/models/dtos/update-transfer-records.dto';
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

@ApiTags('Registro de transferencia')
@ApiBearerAuth('access-token')
@Controller('transfer-records')
export class UpdateTransferRecordsController {
  constructor(
    @Inject(UpdateTransferRecordsUseCase)
    private readonly transferRecordsService: UpdateTransferRecordsUseCase,
  ) {}

  @ApiOperation({ summary: 'Modificar registro de transferencia' })
  @ApiBody({ type: UpdateTransferRecordsDTO })
  @ApiOkResponse({ description: 'Registro de transferencia atualizado' })
  @ApiNotFoundResponse({
    description: 'Registro de transferencia não encontrado.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() transferRecordsDTO: UpdateTransferRecordsDTO,
  ): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'ID deve ser um numero' });
    }
    await this.transferRecordsService.update(id, transferRecordsDTO);
    return 'Registro de transferencia atualizado';
  }
}
