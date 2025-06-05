import { FindManyOptions, ILike, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserLoginDTO } from '../dtos/create-user.dto';
import { UpdateUserLoginDTO } from '../dtos/update-user.dto';
import { FindUserLoginDTO } from '../dtos/find-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { IUserLoginRepo } from '../interface/user-repo.interface';
import { User } from '../entity/user.entity';

@Injectable()
export class UserLoginRepository implements IUserLoginRepo {
  constructor(
    @InjectRepository(User, DB_PG_DATABASE)
    private readonly repository: Repository<User>,
  ) {}

  async create(userLoginDTO: CreateUserLoginDTO): Promise<number> {
    const result = await this.repository.save({ ...userLoginDTO });
    return result.id;
  }

  async find(filters: FindUserLoginDTO): Promise<{
    data: User[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<User> = {
      where: {
        ...(filters.name && { name: ILike(`%${filters.name}%`) }),
        ...(filters.login && { login: filters.login }),
        ...(filters.permissionLevel && {
          permissionLevel: filters.permissionLevel,
        }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
    };

    const [data, totalItems] = await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: data, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<User | undefined> {
    const userLogin = await this.repository.findOne({ where: { id: id } });
    if (!userLogin) {
      throw new NotFoundException({ message: 'Usuario não encontrado' });
    }
    return userLogin;
  }

  async findByDocument(login: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: { login },
    });
  }

  async update(Id: number, userLoginDTO: UpdateUserLoginDTO): Promise<User> {
    const userLogin = await this.repository.findOne({ where: { id: Id } });

    const updateUserLogin = await this.repository.save({
      ...userLogin,
      ...userLoginDTO,
    });

    return updateUserLogin;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
