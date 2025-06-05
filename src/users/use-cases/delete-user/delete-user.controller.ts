import {
  Controller,
  Delete,
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
import { DeleteUserLoginUseCase } from './delete-user.use-case';

@ApiTags('Login usuarios')
//@ApiBearerAuth('access-token')
@Controller('userLogin')
export class DeleteUserLoginController {
  constructor(
    @Inject(DeleteUserLoginUseCase)
    private readonly userService: DeleteUserLoginUseCase,
  ) {}

  @ApiOperation({ summary: 'Excluir um login de usuario' })
  @ApiOkResponse({ description: 'Login de usuario removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Login de usuario não encontrado.' })
  @ApiNotAcceptableResponse({ description: 'Id inválido.' })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno entre em contato com o suporte.',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<string> {
    if (isNaN(id)) {
      throw new NotAcceptableException({ message: 'Id deve ser um numero' });
    }
    await this.userService.delete(id);
    return 'Login de usuario removido com sucesso';
  }
}
