import { FindAllQuarentineRecordUseCase } from './find-all-quarentine-record.use-case';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { FindQuarentineRecordDTO } from 'src/quarentine-record/models/dtos/find-quarentine-record.dto';
import { QuarantineRecord } from 'src/quarentine-record/models/entity/quarentine-record.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Registro de quarentena')
@ApiBearerAuth('access-token')
@Controller('quarentine-record')
export class FindAllQuarentineRecordController {
  constructor(
    @Inject(FindAllQuarentineRecordUseCase)
    private readonly quarentineRecordService: FindAllQuarentineRecordUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar registro de quarentena' })
  @ApiOkResponse()
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() quarentineRecordDTO: FindQuarentineRecordDTO): Promise<{
    data: QuarantineRecord[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.quarentineRecordService.find(quarentineRecordDTO);
  }
}
