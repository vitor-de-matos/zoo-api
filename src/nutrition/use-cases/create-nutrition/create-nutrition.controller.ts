import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateNutritionUseCase } from './create-nutrition.use-case';
import { CreateNutritionDTO } from 'src/nutrition/models/dtos/create-nutrition.dto';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Nutrição')
@ApiBearerAuth('access-token')
@Controller('nutrition')
export class CreateNutritionController {
  constructor(
    @Inject(CreateNutritionUseCase)
    private readonly nutritionService: CreateNutritionUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar nutrição' })
  @ApiBody({ type: CreateNutritionDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(@Body() nutritionDTO: CreateNutritionDTO): Promise<number> {
    return await this.nutritionService.create(nutritionDTO);
  }
}
