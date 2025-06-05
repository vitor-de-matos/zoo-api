import { FeedingSchedule } from 'src/feeding-schedule/models/entity/feeding-schedule.entity';
import {
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Column,
  Entity,
} from 'typeorm';
import { Species } from 'src/species/models/entity/species.entity';

@Entity('nutrition')
export class Nutrition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'diet_type', type: 'varchar' })
  dietType: string;

  @Column({ name: 'food_items', type: 'jsonb' })
  foodItems: string[];

  @Column({ name: 'daily_calories', type: 'integer' })
  dailyCalories: number;

  @Column({ name: 'feeding_method', type: 'varchar' })
  feedingMethod: string;

  @Column({ name: 'notes', type: 'varchar', nullable: true })
  notes?: string;

  @ManyToOne(() => Species, (species) => species.nutrition)
  @JoinColumn({ name: 'id_species' })
  species: Species;

  @OneToMany(() => FeedingSchedule, (schedule) => schedule.nutrition)
  feedingSchedules: FeedingSchedule[];
}
