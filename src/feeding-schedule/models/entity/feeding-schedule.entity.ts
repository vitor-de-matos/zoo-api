import { Animal } from 'src/animal/models/entity/animal.entity';
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

  @ManyToOne(() => Animal, (animal) => animal.feedingSchedule)
  @JoinColumn({ name: 'id_animal' })
  animal: Animal;

  @ManyToOne(() => Nutrition, (nutrition) => nutrition.feedingSchedules)
  @JoinColumn({ name: 'id_nutrition' })
  nutrition: Nutrition;
}
