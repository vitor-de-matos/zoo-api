import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindAllSpeciesUseCase } from './find-all-species.use-case';
import { FindSpeciesDTO } from 'src/species/models/dtos/find-species.dto';
import { Species } from 'src/species/models/entity/species.entity';

@ApiTags('Especie')
@ApiBearerAuth('access-token')
@Controller('specie')
export class FindAllSpecieController {
  constructor(
    @Inject(FindAllSpeciesUseCase)
    private readonly speciesService: FindAllSpeciesUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar especie' })
  @ApiOkResponse()
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() specieDTO: FindSpeciesDTO): Promise<{
    data: Species[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.speciesService.find(specieDTO);
  }
}
