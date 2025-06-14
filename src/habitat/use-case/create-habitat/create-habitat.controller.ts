import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateHabitatUseCase } from './create-habitat.use-case';
import { CreateHabitatDTO } from 'src/habitat/models/dtos/create-habitat.dto';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Habitate')
@ApiBearerAuth('access-token')
@Controller('habitat')
export class CreateHabitatController {
  constructor(
    @Inject(CreateHabitatUseCase)
    private readonly habitatService: CreateHabitatUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar habitate' })
  @ApiBody({ type: CreateHabitatDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(@Body() habitatDTO: CreateHabitatDTO): Promise<number> {
    return await this.habitatService.create(habitatDTO);
  }
}
