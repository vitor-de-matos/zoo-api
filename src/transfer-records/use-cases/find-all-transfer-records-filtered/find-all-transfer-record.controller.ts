import { Controller, Get, Inject, Query } from '@nestjs/common';
import { FindAllTransferRecordsUseCase } from './find-all-transfer-record.use-case';
import { TransferRecords } from 'src/transfer-records/models/entity/transfer-records.entity';
import { FindSpeciesDTO } from 'src/species/models/dtos/find-species.dto';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Registro de transferencia')
@ApiBearerAuth('access-token')
@Controller('transfer-records')
export class FindAllTransferRecordsController {
  constructor(
    @Inject(FindAllTransferRecordsUseCase)
    private readonly transferRecordService: FindAllTransferRecordsUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar registro de transferencia' })
  @ApiOkResponse()
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() transferRecordDTO: FindSpeciesDTO): Promise<{
    data: TransferRecords[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.transferRecordService.find(transferRecordDTO);
  }
}
