import { Habitat } from 'src/habitat/models/entity/habitat.entity';
import { Keeper } from 'src/keeper/models/entity/keeper.entity';
import { Species } from 'src/species/models/entity/species.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'age', type: 'smallint' })
  age: number;

  @Column({ name: 'gender', type: 'varchar', nullable: true })
  gender: string;

  @ManyToOne(() => Species, (species) => species.animals)
  @JoinColumn({ name: 'id_species' })
  species: Species;

  @ManyToOne(() => Habitat, (habitat) => habitat.animals)
  @JoinColumn({ name: 'id_habitat' })
  habitat: Habitat;

  @ManyToMany(() => Keeper, (keeper) => keeper.animals)
  keepers: Keeper[];
}
