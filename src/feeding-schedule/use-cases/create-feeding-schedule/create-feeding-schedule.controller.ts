import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateFeedingScheduleDTO } from 'src/feeding-schedule/models/dtos/create-feeding-schedue.dto';
import { CreateFeedingScheduleUseCase } from './create-feeding-schedule.use-case';

@ApiTags('Horario de alimentação')
@ApiBearerAuth('access-token')
@Controller('feeding-schedule')
export class CreateFeedingScheduleController {
  constructor(
    @Inject(CreateFeedingScheduleUseCase)
    private readonly feedingScheduleService: CreateFeedingScheduleUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar horario de alimentação' })
  @ApiBody({ type: CreateFeedingScheduleDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(
    @Body() feedingScheduleDTO: CreateFeedingScheduleDTO,
  ): Promise<number> {
    return await this.feedingScheduleService.create(feedingScheduleDTO);
  }
}
