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
import { FindHabitatUseCase } from './find-habitat.use-case';
import { Habitat } from 'src/habitat/models/entity/habitat.entity';

@ApiTags('Habitate')
@ApiBearerAuth('access-token')
@Controller('habitat')
export class FindHabitatController {
  constructor(
    @Inject(FindHabitatUseCase)
    private readonly habitatService: FindHabitatUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar habitate' })
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'Habitate não encontrado.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<Habitat> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida. Entre em contato com o suporte.',
      });
    }
    return await this.habitatService.find(id);
  }
}
