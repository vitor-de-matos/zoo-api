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
import { UpdateSpeciesUseCase } from './update-specie.use-case';
import { UpdateSpeciesDTO } from 'src/species/models/dtos/update-species.dto';

@ApiTags('Especie')
@ApiBearerAuth('access-token')
@Controller('specie')
export class UpdateSpeciesController {
  constructor(
    @Inject(UpdateSpeciesUseCase)
    private readonly speciesService: UpdateSpeciesUseCase,
  ) {}

  @ApiOperation({ summary: 'Modificar especie' })
  @ApiBody({ type: UpdateSpeciesDTO })
  @ApiOkResponse({ description: 'Especie atualizada' })
  @ApiNotFoundResponse({
    description: 'Especie não encontrada.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() speciesDTO: UpdateSpeciesDTO,
  ): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'ID deve ser um numero' });
    }
    await this.speciesService.update(id, speciesDTO);
    return 'Especie atualizada';
  }
}
