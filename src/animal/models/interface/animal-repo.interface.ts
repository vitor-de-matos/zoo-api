import { CreateAnimalDTO } from '../dto/create-animal.dto';
import { UpdateAnimalDTO } from '../dto/update-animal.dto';
import { FindAnimalDTO } from '../dto/find-animal.dto';
import { Animal } from '../entity/animal.entity';

export interface IAnimalRepo {
  create(animalDTO: CreateAnimalDTO): Promise<number>;
  find(filters: FindAnimalDTO): Promise<{
    data: Animal[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Animal | undefined>;
  update(animalId: number, animalDTO: UpdateAnimalDTO): Promise<Animal>;
  delete(id: number): Promise<void>;
}
