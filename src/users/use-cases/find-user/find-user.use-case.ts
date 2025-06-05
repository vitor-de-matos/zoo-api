import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/models/entity/user.entity';
import { IUserLoginRepo } from 'src/users/models/interface/user-repo.interface';

@Injectable()
export class FindUserLoginUseCase {
  constructor(
    @Inject('IUserLoginRepo')
    private readonly userLoginRepository: IUserLoginRepo,
  ) {}

  async find(userLoginId: number): Promise<User> {
    const userLogin = await this.userLoginRepository.findById(userLoginId);
    if (!userLogin) {
      throw new NotFoundException({
        message: 'Login de usuario não encontrado',
      });
    }
    return userLogin;
  }
}
