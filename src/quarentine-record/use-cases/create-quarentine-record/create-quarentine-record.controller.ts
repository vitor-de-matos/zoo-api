import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateQuarentineRecordUseCase } from './create-quarentine-record.use-case';
import { CreateQuarentineRecordDTO } from 'src/quarentine-record/models/dtos/create-quarentine-record.dto';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Registro de quarentena')
@ApiBearerAuth('access-token')
@Controller('quarentine-record')
export class CreateQuarentineRecordController {
  constructor(
    @Inject(CreateQuarentineRecordUseCase)
    private readonly quarentineRecordService: CreateQuarentineRecordUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar registro de quarentena' })
  @ApiBody({ type: CreateQuarentineRecordDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(
    @Body() quarentineRecordDTO: CreateQuarentineRecordDTO,
  ): Promise<number> {
    return await this.quarentineRecordService.create(quarentineRecordDTO);
  }
}
