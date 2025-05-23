import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Animal } from '../../../animal/models/entity/animal.entity';

@Entity('measurement_records')
export class MeasurementRecord {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  weightKg: number;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  heightCm: number;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  bodyConditionScore: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  measuredAt: Date;

  @ManyToOne(() => Animal, (animal) => animal.measurements, {
    onDelete: 'CASCADE',
  })
  animal: Animal;
}
