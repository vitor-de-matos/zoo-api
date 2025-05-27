import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAnimalDTO } from '../dto/update-animal.dto';
import { CreateAnimalDTO } from '../dto/create-animal.dto';
import { DB_PG_DATABASE } from 'src/shared/database/postgres.config';
import { FindAnimalDTO } from '../dto/find-animal.dto';
import { IAnimalRepo } from '../interface/animal-repo.interface';
import { Animal } from '../entity/animal.entity';
import {
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
  Between,
  ILike,
} from 'typeorm';

@Injectable()
export class AnimalRepository implements IAnimalRepo {
  constructor(
    @InjectRepository(Animal, DB_PG_DATABASE)
    private readonly repository: Repository<Animal>,
  ) {}

  async create(animalDTO: CreateAnimalDTO): Promise<number> {
    const result = await this.repository.save(animalDTO);
    return result.id;
  }

  async find(filters: FindAnimalDTO): Promise<{
    data: Animal[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const queryOptions: FindManyOptions<Animal> = {
      where: {
        ...(filters.name && { name: ILike(`%${filters.name}%`) }),
        ...(filters.minAge !== undefined && filters.maxAge !== undefined
          ? { age: Between(filters.minAge, filters.maxAge) }
          : filters.minAge !== undefined
            ? { age: MoreThanOrEqual(filters.minAge) }
            : filters.maxAge !== undefined
              ? { age: LessThanOrEqual(filters.maxAge) }
              : {}),
        ...(filters.gender && { gender: filters.gender }),
        ...(filters.idHabitat && {
          habitat: { id: filters.idHabitat },
        }),
        ...(filters.idSpecies && { species: { id: filters.idSpecies } }),
      },
      ...(filters.page && filters.quantity
        ? {
            take: filters.quantity,
            skip: (filters.page - 1) * filters.quantity,
          }
        : {}),
      relations: { habitat: true, species: true },
    };

    const [data, totalItems] = await this.repository.findAndCount(queryOptions);

    const totalPages = filters.quantity
      ? Math.ceil(totalItems / filters.quantity)
      : 1;
    const currentPage = filters.page || 1;
    return { data: data, currentPage, totalPages, totalItems };
  }

  async findById(id: number): Promise<Animal | undefined> {
    const animal = await this.repository.findOne({
      where: { id: id },
      relations: { habitat: true, species: true },
    });
    if (!animal) {
      throw new NotFoundException({
        message: 'Animal não encontrado',
      });
    }
    return animal;
  }

  async update(animalId: number, animalDTO: UpdateAnimalDTO): Promise<Animal> {
    const animal = await this.repository.findOne({ where: { id: animalId } });

    if (!animal) {
      throw new NotFoundException({
        message: 'Animal não encontrado',
      });
    }

    const UpdateAnimal = await this.repository.save({
      ...animal,
      ...animalDTO,
    });

    return UpdateAnimal;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
