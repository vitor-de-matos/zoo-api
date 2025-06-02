import { Animal } from 'src/animal/models/entity/animal.entity';
import { MedicalRecord } from 'src/medical-record/models/entity/medical-record.entity';
import {
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
  Column,
  Entity,
} from 'typeorm';

@Entity('quarantine_record')
export class QuarantineRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'start_date', type: 'timestamptz' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamptz', nullable: true })
  endDate?: Date;

  @Column({ name: 'reason', type: 'varchar' })
  reason: string;

  @Column({ name: 'location', type: 'varchar' })
  location: string;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string;

  @ManyToOne(() => Animal, (animal) => animal.quarantineRecords)
  @JoinColumn({ name: 'id_animal' })
  animal: Animal;

  @OneToMany(() => MedicalRecord, (record) => record.quarantine)
  medicalRecords: MedicalRecord[];
}
