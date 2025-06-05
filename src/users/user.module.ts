import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/entity/user.entity';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { CreateUserLoginController } from './use-cases/create-user/create-user.controller';
import { FindUserLoginController } from './use-cases/find-user/find-user.controller';
import { FindAllUserLoginController } from './use-cases/find-all-user-filtered/find-all-user.controller';
import { UpdateUserLoginController } from './use-cases/update-user/update-user.controller';
import { DeleteUserLoginController } from './use-cases/delete-user/delete-user.controller';
import { CreateUserLoginUseCase } from './use-cases/create-user/create-user.use-case';
import { FindUserLoginUseCase } from './use-cases/find-user/find-user.use-case';
import { FindAllUserLoginUseCase } from './use-cases/find-all-user-filtered/find-all-user.use-case';
import { UpdateUserLoginUseCase } from './use-cases/update-user/update-user.use-case';
import { DeleteUserLoginUseCase } from './use-cases/delete-user/delete-user.use-case';
import { UserLoginRepository } from './models/repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User], DB_PG_DATABASE)],
  controllers: [
    CreateUserLoginController,
    FindUserLoginController,
    FindAllUserLoginController,
    UpdateUserLoginController,
    DeleteUserLoginController,
  ],
  providers: [
    CreateUserLoginUseCase,
    FindUserLoginUseCase,
    FindAllUserLoginUseCase,
    UpdateUserLoginUseCase,
    DeleteUserLoginUseCase,
    UserLoginRepository,
    { provide: 'IUserLoginRepo', useExisting: UserLoginRepository },
  ],
  exports: ['IUserLoginRepo'],
})
export class UserLoginModule {}
