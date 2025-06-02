import { FindKeeperUseCase } from './find-keeper.use-case';
import { Keeper } from 'src/keeper/models/entity/keeper.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  NotAcceptableException,
  Controller,
  Inject,
  Param,
  Get,
} from '@nestjs/common';

@ApiTags('Tratador')
@ApiBearerAuth('access-token')
@Controller('keeper')
export class FindKeeperController {
  constructor(
    @Inject(FindKeeperUseCase)
    private readonly keeperService: FindKeeperUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar tratador' })
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'Tratador não encontrado.',
  })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<Keeper> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida. Entre em contato com o suporte.',
      });
    }
    return await this.keeperService.find(id);
  }
}
