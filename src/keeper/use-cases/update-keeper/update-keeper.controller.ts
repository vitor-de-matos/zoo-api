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
import { UpdateKeeperUseCase } from './update-keeper.use-case';
import { UpdateKeeperDTO } from 'src/keeper/models/dtos/update-keeper.dto';

@ApiTags('Tratador')
@ApiBearerAuth('access-token')
@Controller('keeper')
export class UpdateKeeperController {
  constructor(
    @Inject(UpdateKeeperUseCase)
    private readonly keeperService: UpdateKeeperUseCase,
  ) {}

  @ApiOperation({ summary: 'Modificar tratador' })
  @ApiBody({ type: UpdateKeeperDTO })
  @ApiOkResponse({ description: 'Tratador atualizado' })
  @ApiNotFoundResponse({
    description: 'Tratador não encontrado.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() keeperDTO: UpdateKeeperDTO,
  ): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'ID deve ser um numero' });
    }
    await this.keeperService.update(id, keeperDTO);
    return 'Tratador atualizado';
  }
}
