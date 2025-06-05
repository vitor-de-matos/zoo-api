import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Animal } from 'src/animal/models/entity/animal.entity';
import { Nutrition } from 'src/nutrition/models/entity/nutrition.entity';
@Entity()
export class Species {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'common_name', type: 'varchar' })
  commonName: string;

  @Column({ name: 'scientific_name', type: 'varchar' })
  scientificName: string;

  @OneToMany(() => Animal, (animal) => animal.species)
  animals: Animal[];

  @OneToMany(() => Nutrition, (nutrition) => nutrition.species)
  nutrition: Nutrition[];
}
