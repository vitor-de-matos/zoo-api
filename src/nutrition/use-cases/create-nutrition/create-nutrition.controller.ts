import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateNutritionUseCase } from './create-nutrition.use-case';
import { CreateNutritionDTO } from 'src/nutrition/models/dtos/create-nutrition.dto';

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
