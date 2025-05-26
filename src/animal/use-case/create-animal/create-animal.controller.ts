import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateAnimalUseCase } from './create-animal.use-case';
import { CreateAnimalDTO } from 'src/animal/models/dto/create-animal.dto';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Animal')
@ApiBearerAuth('access-token')
@Controller('animal')
export class CreateAnimalController {
  constructor(
    @Inject(CreateAnimalUseCase)
    private readonly createBannerService: CreateAnimalUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar banner' })
  @ApiBody({ type: CreateAnimalDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(@Body() bannerDTO: CreateAnimalDTO): Promise<number> {
    return await this.createBannerService.create(bannerDTO);
  }
}
