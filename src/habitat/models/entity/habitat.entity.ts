import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Animal } from 'src/animal/models/entity/animal.entity';

@Entity()
export class Habitat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'environment_type', type: 'varchar' })
  environmentType: string;

  @OneToMany(() => Animal, (animal) => animal.habitat)
  animals: Animal[];
}
