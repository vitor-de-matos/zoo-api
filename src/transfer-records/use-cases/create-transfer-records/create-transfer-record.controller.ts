import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTransferRecordsUseCase } from './create-transfer-record.use-case';
import { CreateTransferRecordsDTO } from 'src/transfer-records/models/dtos/create-transfer-records.dto';

@ApiTags('Registro de transferencia')
@ApiBearerAuth('access-token')
@Controller('transfer-records')
export class CreateTransferRecordsController {
  constructor(
    @Inject(CreateTransferRecordsUseCase)
    private readonly transferRecordsService: CreateTransferRecordsUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar registro de transferencia' })
  @ApiBody({ type: CreateTransferRecordsDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(
    @Body() transferRecordsDTO: CreateTransferRecordsDTO,
  ): Promise<number> {
    return await this.transferRecordsService.create(transferRecordsDTO);
  }
}
