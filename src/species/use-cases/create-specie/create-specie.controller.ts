import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSpeciesUseCase } from './create-specie.use-case';
import { CreateSpeciesDTO } from 'src/species/models/dtos/create-species.dto';

@ApiTags('Especie')
@ApiBearerAuth('access-token')
@Controller('specie')
export class CreateSpeciesController {
  constructor(
    @Inject(CreateSpeciesUseCase)
    private readonly speciesService: CreateSpeciesUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar especie' })
  @ApiBody({ type: CreateSpeciesDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(@Body() speciesDTO: CreateSpeciesDTO): Promise<number> {
    return await this.speciesService.create(speciesDTO);
  }
}
