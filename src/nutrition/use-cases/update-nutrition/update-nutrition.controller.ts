import {
  Body,
  Controller,
  Inject,
  NotAcceptableException,
  Param,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateNutritionUseCase } from './update-nutrition.use-case';
import { UpdateNutritionDTO } from 'src/nutrition/models/dtos/update-nutrition.dto';

@ApiTags('Nutrição')
@ApiBearerAuth('access-token')
@Controller('nutrition')
export class UpdateNutritionController {
  constructor(
    @Inject(UpdateNutritionUseCase)
    private readonly nutritionService: UpdateNutritionUseCase,
  ) {}

  @ApiOperation({ summary: 'Modificar nutrição' })
  @ApiBody({ type: UpdateNutritionDTO })
  @ApiOkResponse({ description: 'Nutrição atualizada' })
  @ApiNotFoundResponse({
    description: 'Nutrição não encontrada.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() nutritionDTO: UpdateNutritionDTO,
  ): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'ID deve ser um numero' });
    }
    await this.nutritionService.update(id, nutritionDTO);
    return 'Nutrição atualizada';
  }
}
