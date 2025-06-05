import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserLoginUseCase } from './create-user.use-case';
import { CreateUserLoginDTO } from 'src/users/models/dtos/create-user.dto';

@ApiTags('Login usuarios')
//@ApiBearerAuth('access-token')
@Controller('userLogin')
export class CreateUserLoginController {
  constructor(
    @Inject(CreateUserLoginUseCase)
    private readonly userLoginService: CreateUserLoginUseCase,
  ) {}

  @ApiOperation({ summary: 'Adicionar login de usuario' })
  @ApiBody({ type: CreateUserLoginDTO })
  @ApiCreatedResponse({ type: Number })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Post()
  async create(@Body() userLoginDTO: CreateUserLoginDTO): Promise<number> {
    return await this.userLoginService.create(userLoginDTO);
  }
}
