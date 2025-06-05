import { Inject, Injectable } from '@nestjs/common';
import { FindUserLoginDTO } from 'src/users/models/dtos/find-user.dto';
import { User } from 'src/users/models/entity/user.entity';
import { IUserLoginRepo } from 'src/users/models/interface/user-repo.interface';

@Injectable()
export class FindAllUserLoginUseCase {
  constructor(
    @Inject('IUserLoginRepo')
    private readonly userLoginRepository: IUserLoginRepo,
  ) {}

  async find(userLoginDTO: FindUserLoginDTO): Promise<{
    data: User[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    return await this.userLoginRepository.find(userLoginDTO);
  }
}
