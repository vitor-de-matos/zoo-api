import { Animal } from 'src/animal/models/entity/animal.entity';
import { FeedingSchedule } from 'src/feeding-schedule/models/entity/feeding-schedule.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => Animal, (animal) => animal.nutritions)
  @JoinColumn({ name: 'id_animal' })
  animal: Animal;

  @OneToMany(() => FeedingSchedule, (schedule) => schedule.nutrition)
  feedingSchedules: FeedingSchedule[];
}
