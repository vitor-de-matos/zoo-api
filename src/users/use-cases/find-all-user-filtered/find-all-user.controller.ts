import { Controller, Get, Inject, Query } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindAllUserLoginUseCase } from './find-all-user.use-case';
import { FindUserLoginDTO } from 'src/users/models/dtos/find-user.dto';
import { User } from 'src/users/models/entity/user.entity';

@ApiTags('Login usuarios')
//@ApiBearerAuth('access-token')
@Controller('userLogin')
export class FindAllUserLoginController {
  constructor(
    @Inject(FindAllUserLoginUseCase)
    private readonly userLoginService: FindAllUserLoginUseCase,
  ) {}

  @ApiOperation({ summary: 'Busca varios Login de usuario' })
  @ApiOkResponse({})
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Get()
  async find(@Query() userLoginDTO: FindUserLoginDTO): Promise<{
    data: User[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.userLoginService.find(userLoginDTO);
  }
}
