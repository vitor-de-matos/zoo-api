import { UpdateAnimalUseCase } from './update-animal.use-case';
import { UpdateAnimalDTO } from 'src/animal/models/dto/update-animal.dto';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Inject,
  Param,
  Patch,
  Body,
} from '@nestjs/common';

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
