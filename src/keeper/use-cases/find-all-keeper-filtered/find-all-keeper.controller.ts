import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindAllKeeperUseCase } from './find-all-keeper.use-case';
import { FindKeeperDTO } from 'src/keeper/models/dtos/find-keeper.dto';
import { Keeper } from 'src/keeper/models/entity/keeper.entity';

@ApiTags('Tratador')
@ApiBearerAuth('access-token')
@Controller('keeper')
export class FindAllKeeperController {
  constructor(
    @Inject(FindAllKeeperUseCase)
    private readonly keeperService: FindAllKeeperUseCase,
  ) {}

  @ApiOperation({ summary: 'Buscar tratador' })
  @ApiOkResponse()
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() keeperDTO: FindKeeperDTO): Promise<{
    data: Keeper[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.keeperService.find(keeperDTO);
  }
}
