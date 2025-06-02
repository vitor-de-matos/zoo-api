import { Nutrition } from 'src/nutrition/models/entity/nutrition.entity';
import { Species } from 'src/species/models/entity/species.entity';
import {
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
  Entity,
} from 'typeorm';

@Entity('feeding_schedule')
export class FeedingSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'time', type: 'timestamptz' })
  time: Date;

  @Column({ name: 'notes', type: 'varchar', nullable: true })
  notes?: string;

  @ManyToOne(() => Species, (species) => species.feedingSchedule)
  @JoinColumn({ name: 'id_species' })
  species: Species;

  @ManyToOne(() => Nutrition, (nutrition) => nutrition.feedingSchedules)
  @JoinColumn({ name: 'id_nutrition' })
  nutrition: Nutrition;
}
