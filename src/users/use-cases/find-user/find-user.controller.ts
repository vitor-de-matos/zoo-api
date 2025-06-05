import {
  Controller,
  Get,
  Inject,
  NotAcceptableException,
  Param,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindUserLoginUseCase } from './find-user.use-case';
import { User } from 'src/users/models/entity/user.entity';

@ApiTags('Login usuarios')
//@ApiBearerAuth('access-token')
@Controller('userLogin')
export class FindUserLoginController {
  constructor(
    @Inject(FindUserLoginUseCase)
    private readonly userLoginService: FindUserLoginUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca login de usuario por ID' })
  @ApiOkResponse({})
  @ApiNotFoundResponse({ description: 'Login de usuario não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get(':id')
  async find(@Param('id') id: number): Promise<User> {
    if (isNaN(id)) {
      throw new NotAcceptableException({
        message: 'Requisição inválida; era esperado um ID numérico válido.',
      });
    }
    return await this.userLoginService.find(id);
  }
}
