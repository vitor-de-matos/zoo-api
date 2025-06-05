import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserLoginDTO } from 'src/users/models/dtos/update-user.dto';
import { IUserLoginRepo } from 'src/users/models/interface/user-repo.interface';

@Injectable()
export class UpdateUserLoginUseCase {
  constructor(
    @Inject('IUserLoginRepo')
    private readonly userLoginRepository: IUserLoginRepo,
  ) {}

  async update(userId: number, userDTO: UpdateUserLoginDTO) {
    const user = await this.userLoginRepository.findById(userId);
    if (!user) {
      throw new NotFoundException({
        message: 'Login de usuario não encontrado',
      });
    }

    const updated = await this.userLoginRepository.update(userId, userDTO);

    if (!updated) {
      throw new InternalServerErrorException({
        message: 'Erro ao atualizar entre em contato com o suporte',
      });
    }

    return updated;
  }
}
