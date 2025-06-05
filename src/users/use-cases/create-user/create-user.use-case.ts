import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserLoginDTO } from 'src/users/models/dtos/create-user.dto';
import { IUserLoginRepo } from 'src/users/models/interface/user-repo.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserLoginUseCase {
  constructor(
    @Inject('IUserLoginRepo')
    private readonly userRepository: IUserLoginRepo,
  ) {}

  async create(userLoginDTO: CreateUserLoginDTO): Promise<number> {
    const userLogin = await this.userRepository.find({
      login: userLoginDTO.login,
    });

    if (userLogin.data?.length) {
      throw new BadRequestException({ message: 'Usuario ja existe' });
    }
    const hashedPassword = await bcrypt.hash(userLoginDTO.password, 10);
    userLoginDTO.password = hashedPassword;

    const employeeCreated = await this.userRepository.create(userLoginDTO);

    if (isNaN(employeeCreated)) {
      throw new BadRequestException({
        message: 'Resposta invalida; entre em contato com o suporte',
      });
    }
    return employeeCreated;
  }
}
