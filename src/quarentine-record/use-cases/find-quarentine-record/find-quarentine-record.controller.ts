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
import { FindQuarentineRecordUseCase } from './find-quarentine-record.use-case';
import { QuarantineRecord } from 'src/quarentine-record/models/entity/quarentine-record.entity';

@ApiTags('Registro de quarentena')
@ApiBearerAuth('access-token')
@Controller('quarentine-record')
export class FindQuarentineRecordController {
  constructor(
    @Inject(FindQuarentineRecordUseCase)
    private readonly quarentineRecordService: FindQuarentineRecordUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar registro de quarentena' })
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'Registro de quarentena não encontrado.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<QuarantineRecord> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida. Entre em contato com o suporte.',
      });
    }
    return await this.quarentineRecordService.find(id);
  }
}
