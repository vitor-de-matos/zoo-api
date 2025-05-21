import { Animal } from 'src/animal/models/entity/animal.entity';
import {
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Column,
  Entity,
} from 'typeorm';

@Entity()
export class Keeper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', type: 'varchar' })
  fullName: string;

  @Column({ name: 'shift', type: 'varchar' })
  shift: string;

  @ManyToMany(() => Animal)
  @JoinTable()
  animals: Animal[];
}
