import { Injectable, NotFoundException } from '@nestjs/common';
import { ISpeciesRepo } from '../interface/species-repo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Species } from '../entity/species.entity';
import { DB_PG_DATABASE } from 'src/shared/database/postgres.config';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { CreateSpeciesDTO } from '../dtos/create-species.dto';
import { FindSpeciesDTO } from '../dtos/find-species.dto';
import { UpdateSpeciesDTO } from '../dtos/update-species.dto';

@Injectable()
export class SpeciesRepository implements ISpeciesRepo {
  constructor(
    @InjectRepository(Species, DB_PG_DATABASE)
    private readonly repository: Repository<Species>,
  ) {}

  async create(speciesDTO: CreateSpeciesDTO): Promise<number> {
    const result = await this.repository.save(speciesDTO);
    return result.id;
  }

  async find(filters: FindSpeciesDTO): Promise<{
    data: Species[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<Species> = {
      where: {
        ...(filters.commonName && {
          commonName: ILike(`%${filters.commonName}%`),
        }),
        ...(filters.scientificName && {
          scientificName: ILike(`%${filters.scientificName}%`),
        }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
      relations: { animals: true, feedingSchedule: true },
    };

    const [data, totalItems] = await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: data, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<Species | undefined> {
    const species = await this.repository.findOne({
      where: { id: id },
      relations: { animals: true, feedingSchedule: true },
    });
    if (!species) {
      throw new NotFoundException({
        message: 'Especie não encontrada',
      });
    }
    return species;
  }

  async update(
    speciesId: number,
    speciesDTO: UpdateSpeciesDTO,
  ): Promise<Species> {
    const species = await this.repository.findOne({
      where: { id: speciesId },
    });

    if (!species) {
      throw new NotFoundException({
        message: 'Especie não encontrada',
      });
    }

    const UpdateSpecie = await this.repository.save({
      ...species,
      ...speciesDTO,
    });

    return UpdateSpecie;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
