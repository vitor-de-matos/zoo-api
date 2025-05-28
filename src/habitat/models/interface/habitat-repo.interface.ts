import { CreateHabitatDTO } from '../dtos/create-habitat.dto';
import { FindHabitatDTO } from '../dtos/find-habitat.dto';
import { UpdateHabitatDTO } from '../dtos/update-habitat.dto';
import { Habitat } from '../entity/habitat.entity';

export interface IHabitatRepo {
  create(habitatDTO: CreateHabitatDTO): Promise<number>;
  find(filters: FindHabitatDTO): Promise<{
    data: Habitat[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Habitat | undefined>;
  update(habitatId: number, habitatDTO: UpdateHabitatDTO): Promise<Habitat>;
  delete(id: number): Promise<void>;
}
