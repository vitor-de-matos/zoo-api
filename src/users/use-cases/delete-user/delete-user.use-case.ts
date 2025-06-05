import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUserLoginRepo } from 'src/users/models/interface/user-repo.interface';

@Injectable()
export class DeleteUserLoginUseCase {
  constructor(
    @Inject('IUserLoginRepo')
    private readonly userRepository: IUserLoginRepo,
  ) {}

  async delete(id: number): Promise<void> {
    const userLogin = await this.userRepository.findById(id);

    if (!userLogin) {
      throw new NotFoundException({
        message: 'Login do usuario não encontrado',
      });
    }

    await this.userRepository.delete(id);
  }
}
