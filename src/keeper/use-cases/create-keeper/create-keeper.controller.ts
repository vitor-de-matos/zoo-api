import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateKeeperUseCase } from './create-keeper.use-case';
import { CreateKeeperDTO } from 'src/keeper/models/dtos/create-keeper.dto';
import {
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Tratador')
@ApiBearerAuth('access-token')
@Controller('keeper')
export class CreateKeeperController {
  constructor(
    @Inject(CreateKeeperUseCase)
    private readonly keeperService: CreateKeeperUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar tratador' })
  @ApiBody({ type: CreateKeeperDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(@Body() keeperDTO: CreateKeeperDTO): Promise<number> {
    return await this.keeperService.create(keeperDTO);
  }
}
