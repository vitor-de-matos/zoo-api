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
import { UpdateHabitatUseCase } from './update-habitat.use-case';
import { UpdateHabitatDTO } from 'src/habitat/models/dtos/update-habitat.dto';

@ApiTags('Habitate')
@ApiBearerAuth('access-token')
@Controller('habitat')
export class UpdateHabitatController {
  constructor(
    @Inject(UpdateHabitatUseCase)
    private readonly habitatService: UpdateHabitatUseCase,
  ) {}

  @ApiOperation({ summary: 'Modificar habitate' })
  @ApiBody({ type: UpdateHabitatDTO })
  @ApiOkResponse({ description: 'Habitate atualizado' })
  @ApiNotFoundResponse({
    description: 'Habitate não encontrado.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() habitatDTO: UpdateHabitatDTO,
  ): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'ID deve ser um numero' });
    }
    await this.habitatService.update(id, habitatDTO);
    return 'Habitate atualizado';
  }
}
