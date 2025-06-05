import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateTransferRecordsUseCase } from './create-transfer-record.use-case';
import { CreateTransferRecordsDTO } from 'src/transfer-records/models/dtos/create-transfer-records.dto';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';

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
