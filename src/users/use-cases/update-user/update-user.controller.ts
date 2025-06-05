import {
  Body,
  Controller,
  Inject,
  NotAcceptableException,
  Param,
  Patch,
} from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserLoginUseCase } from './update-user.use-case';
import { UpdateUserLoginDTO } from 'src/users/models/dtos/update-user.dto';
import { User } from 'src/users/models/entity/user.entity';

@ApiTags('Login usuarios')
//@ApiBearerAuth('access-token')
@Controller('userLogin')
export class UpdateUserLoginController {
  constructor(
    @Inject(UpdateUserLoginUseCase)
    private readonly userService: UpdateUserLoginUseCase,
  ) {}

  @ApiOperation({ summary: 'Modifica usuario' })
  @ApiBody({ type: UpdateUserLoginDTO })
  @ApiOkResponse({ description: 'Usuario atualizado' })
  @ApiNotFoundResponse({ description: 'Usuario não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() userDTO: UpdateUserLoginDTO,
  ): Promise<User> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    return await this.userService.update(id, userDTO);
  }
}
