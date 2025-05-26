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
import { UpdateAnimalUseCase } from './update-animal.use-case';
import { UpdateAnimalDTO } from 'src/animal/models/dto/update-animal.dto';

@ApiTags('Animal')
@ApiBearerAuth('access-token')
@Controller('animal')
export class UpdateAnimalController {
  constructor(
    @Inject(UpdateAnimalUseCase)
    private readonly animalService: UpdateAnimalUseCase,
  ) {}

  @ApiOperation({ summary: 'Modificar animal' })
  @ApiBody({ type: UpdateAnimalDTO })
  @ApiOkResponse({ description: 'animal atualizado' })
  @ApiNotFoundResponse({ description: 'animal não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() animalDTO: UpdateAnimalDTO,
  ): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'ID deve ser um numero' });
    }
    await this.animalService.update(id, animalDTO);
    return 'Animal atualizado';
  }
}
