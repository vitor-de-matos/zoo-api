import { FindAllKeeperController } from './use-cases/find-all-keeper-filtered/find-all-keeper.controller';
import { CreateKeeperController } from './use-cases/create-keeper/create-keeper.controller';
import { UpdateKeeperController } from './use-cases/update-keeper/update-keeper.controller';
import { DeleteKeeperController } from './use-cases/delete-keeper/delete-keeper.controller';
import { FindAllKeeperUseCase } from './use-cases/find-all-keeper-filtered/find-all-keeper.use-case';
import { FindKeeperController } from './use-cases/find-keeper/find-keeper.controller';
import { CreateKeeperUseCase } from './use-cases/create-keeper/create-keeper.use-case';
import { UpdateKeeperUseCase } from './use-cases/update-keeper/update-keeper.use-case';
import { DeleteKeeperUseCase } from './use-cases/delete-keeper/delete-keeper.use-case';
import { FindKeeperUseCase } from './use-cases/find-keeper/find-keeper.use-case';
import { KeeperRepository } from './models/repository/keeper.repository';
import { DB_PG_DATABASE } from 'src/shared/database/typeOrm/postgres.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Keeper } from './models/entity/keeper.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Keeper], DB_PG_DATABASE), SharedModule],
  controllers: [
    CreateKeeperController,
    FindKeeperController,
    FindAllKeeperController,
    UpdateKeeperController,
    DeleteKeeperController,
  ],
  providers: [
    CreateKeeperUseCase,
    FindKeeperUseCase,
    FindAllKeeperUseCase,
    UpdateKeeperUseCase,
    DeleteKeeperUseCase,
    KeeperRepository,
    {
      provide: 'IKeeperRepo',
      useExisting: KeeperRepository,
    },
  ],
  exports: ['IKeeperRepo'],
})
export class KeeperModule {}
