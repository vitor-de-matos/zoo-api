import { FindAnimalUseCase } from './find-animal.use-case';
import { Animal } from 'src/animal/models/entity/animal.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Inject,
  Param,
  Get,
} from '@nestjs/common';

@ApiTags('Animal')
@ApiBearerAuth('access-token')
@Controller('animal')
export class FindBannerController {
  constructor(
    @Inject(FindAnimalUseCase)
    private readonly AnimalService: FindAnimalUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar animal' })
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Animal não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<Animal> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida. Entre em contato com o suporte.',
      });
    }
    return await this.AnimalService.find(id);
  }
}
