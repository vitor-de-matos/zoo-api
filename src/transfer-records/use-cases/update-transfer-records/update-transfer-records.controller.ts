import {
  Body,
  Controller,
  Inject,
  NotAcceptableException,
  Param,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateTransferRecordsUseCase } from './update-transfer-records.use-case';
import { UpdateTransferRecordsDTO } from 'src/transfer-records/models/dtos/update-transfer-records.dto';

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
