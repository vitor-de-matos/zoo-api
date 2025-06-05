import { CreateUserLoginDTO } from '../dtos/create-user.dto';
import { FindUserLoginDTO } from '../dtos/find-user.dto';
import { UpdateUserLoginDTO } from '../dtos/update-user.dto';
import { User } from '../entity/user.entity';

export interface IUserLoginRepo {
  create(userLoginDTO: CreateUserLoginDTO): Promise<number>;
  find(filters: FindUserLoginDTO): Promise<{
    data: User[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<User | undefined>;
  update(id: number, userLoginDTO: UpdateUserLoginDTO): Promise<User>;
  delete(id: number): Promise<void>;
}
