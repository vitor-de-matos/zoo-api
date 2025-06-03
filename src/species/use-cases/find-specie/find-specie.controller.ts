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
import { FindSpeciesUseCase } from './find-specie.use-case';
import { Species } from 'src/species/models/entity/species.entity';

@ApiTags('Especie')
@ApiBearerAuth('access-token')
@Controller('specie')
export class FindSpeciesController {
  constructor(
    @Inject(FindSpeciesUseCase)
    private readonly speciesService: FindSpeciesUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar especie' })
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'Especie não encontrada.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<Species> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida. Entre em contato com o suporte.',
      });
    }
    return await this.speciesService.find(id);
  }
}
