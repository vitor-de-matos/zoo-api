import { FindNutritionUseCase } from './find-nutrition.use-case';
import { Nutrition } from 'src/nutrition/models/entity/nutrition.entity';
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

@ApiTags('Nutrição')
@ApiBearerAuth('access-token')
@Controller('nutrition')
export class FindNutritionController {
  constructor(
    @Inject(FindNutritionUseCase)
    private readonly nutritionService: FindNutritionUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar nutrição' })
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'Nutrição não encontrado.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<Nutrition> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida. Entre em contato com o suporte.',
      });
    }
    return await this.nutritionService.find(id);
  }
}
