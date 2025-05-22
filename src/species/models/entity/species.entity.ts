import { Animal } from 'src/animal/models/entity/animal.entity';
import { FeedingSchedule } from 'src/feeding-schedule/models/entity/feeding-schedule.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

  @OneToMany(
    () => FeedingSchedule,
    (feedingSchedule) => feedingSchedule.species,
  )
  feedingSchedule: FeedingSchedule[];
}
