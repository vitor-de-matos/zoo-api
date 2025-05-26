import { FindAllAnimalUseCase } from './find-all-animal.use-case';
import { Animal } from 'src/animal/models/entity/animal.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Inject, Get, Query } from '@nestjs/common';
import { FindAnimalDTO } from 'src/animal/models/dto/find-animal.dto';

@ApiTags('Animal')
@ApiBearerAuth('access-token')
@Controller('animal')
export class FindAllAnimalController {
  constructor(
    @Inject(FindAllAnimalUseCase)
    private readonly animalService: FindAllAnimalUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar animais' })
  @ApiOkResponse()
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() AnimalDTO: FindAnimalDTO): Promise<{
    data: Animal[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.animalService.find(AnimalDTO);
  }
}
