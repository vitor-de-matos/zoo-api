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
import { UpdateQuarentineRecordUseCase } from './update-quarentine-record.use-case';
import { UpdateQuarentineRecordDTO } from 'src/quarentine-record/models/dtos/update-quarentine-record.dto';

@ApiTags('Registro de quarentena')
@ApiBearerAuth('access-token')
@Controller('quarentine-record')
export class UpdateQuarentineRecordController {
  constructor(
    @Inject(UpdateQuarentineRecordUseCase)
    private readonly quarentineRecordService: UpdateQuarentineRecordUseCase,
  ) {}

  @ApiOperation({ summary: 'Modificar registro de quarentena' })
  @ApiBody({ type: UpdateQuarentineRecordDTO })
  @ApiOkResponse({ description: 'Registro de quarentena atualizada' })
  @ApiNotFoundResponse({
    description: 'Registro de quarentena não encontrada.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() quarentineRecordDTO: UpdateQuarentineRecordDTO,
  ): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'ID deve ser um numero' });
    }
    await this.quarentineRecordService.update(id, quarentineRecordDTO);
    return 'Registro de quarentena atualizada';
  }
}
