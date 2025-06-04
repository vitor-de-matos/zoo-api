import {
  Controller,
  Get,
  Inject,
  NotAcceptableException,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindTransferRecordsUseCase } from './find-transfer-record.use-case';
import { TransferRecords } from 'src/transfer-records/models/entity/transfer-records.entity';

@ApiTags('Registro de transferencia')
@ApiBearerAuth('access-token')
@Controller('transfer-records')
export class FindTransferRecordsController {
  constructor(
    @Inject(FindTransferRecordsUseCase)
    private readonly transferRecordService: FindTransferRecordsUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar registro de transferencia' })
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'Registro de transferencia não encontrado.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<TransferRecords> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida. Entre em contato com o suporte.',
      });
    }
    return await this.transferRecordService.find(id);
  }
}
