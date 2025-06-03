import { CreateSpeciesDTO } from '../dtos/create-species.dto';
import { FindSpeciesDTO } from '../dtos/find-species.dto';
import { UpdateSpeciesDTO } from '../dtos/update-species.dto';
import { Species } from '../entity/species.entity';

export interface ISpeciesRepo {
  create(speciesDTO: CreateSpeciesDTO): Promise<number>;
  find(filters: FindSpeciesDTO): Promise<{
    data: Species[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }>;
  findById(id: number): Promise<Species | undefined>;
  update(speciesId: number, speciesDTO: UpdateSpeciesDTO): Promise<Species>;
  delete(id: number): Promise<void>;
}
