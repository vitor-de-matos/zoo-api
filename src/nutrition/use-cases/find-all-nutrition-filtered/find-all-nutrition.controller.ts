import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindAllNutritionUseCase } from './find-all-nutrition.use-case';
import { FindNutritionRecordDTO } from 'src/nutrition/models/dtos/find-nutrition.dto';
import { Nutrition } from 'src/nutrition/models/entity/nutrition.entity';

@ApiTags('Nutrição')
@ApiBearerAuth('access-token')
@Controller('nutrition')
export class FindAllNutritionController {
  constructor(
    @Inject(FindAllNutritionUseCase)
    private readonly nutritionService: FindAllNutritionUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar nutrição' })
  @ApiOkResponse()
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() nutritionDTO: FindNutritionRecordDTO): Promise<{
    data: Nutrition[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.nutritionService.find(nutritionDTO);
  }
}
