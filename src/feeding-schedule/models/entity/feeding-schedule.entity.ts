import { Species } from 'src/species/models/entity/species.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('feeding-schedule')
export class FeedingSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'food', type: 'varchar' })
  food: string;

  @Column({ name: 'quantity', type: 'integer' })
  quantity: number;

  @Column({ name: 'time', type: 'timestamptz' })
  time: Date;

  @Column({ name: 'notes', type: 'varchar', nullable: true })
  notes?: String;

  @ManyToOne(() => Species, (species) => species.feedingSchedule)
  @JoinColumn({ name: 'id_species' })
  species: Species;
}
