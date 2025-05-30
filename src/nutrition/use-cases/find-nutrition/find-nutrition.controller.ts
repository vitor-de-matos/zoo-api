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
import { FindNutritionUseCase } from './find-nutrition.use-case';
import { Nutrition } from 'src/nutrition/models/entity/nutrition.entity';

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
