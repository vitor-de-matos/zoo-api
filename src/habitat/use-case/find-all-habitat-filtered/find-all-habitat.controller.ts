import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindAllHabitatUseCase } from './find-all-habitat.use-case';
import { FindHabitatDTO } from 'src/habitat/models/dtos/find-habitat.dto';
import { Habitat } from 'src/habitat/models/entity/habitat.entity';

@ApiTags('Habitate')
@ApiBearerAuth('access-token')
@Controller('habitat')
export class FindAllHabitatController {
  constructor(
    @Inject(FindAllHabitatUseCase)
    private readonly habitatService: FindAllHabitatUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar habitat' })
  @ApiOkResponse()
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() habitatDTO: FindHabitatDTO): Promise<{
    data: Habitat[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.habitatService.find(habitatDTO);
  }
}
