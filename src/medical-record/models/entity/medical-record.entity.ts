import { QuarantineRecord } from 'src/quarentine-record/models/entity/quarentine-record.entity';
import { Animal } from 'src/animal/models/entity/animal.entity';
import {
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Entity,
  Column,
} from 'typeorm';

@Entity('medical_record')
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'date', type: 'timestamptz' })
  date: Date;

  @Column({ name: 'diagnosis', type: 'varchar' })
  diagnosis: string;

  @Column({ name: 'treatment', type: 'text' })
  treatment: string;

  @Column({ name: 'medication', type: 'text', nullable: true })
  medication?: string;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes?: string;

  @ManyToOne(() => Animal, (animal) => animal.medicalRecords)
  @JoinColumn({ name: 'id_animal' })
  animal: Animal;

  @ManyToOne(() => QuarantineRecord, (record) => record.medicalRecords, {
    nullable: true,
  })
  @JoinColumn({ name: 'id_quarantine' })
  quarantine?: QuarantineRecord;
}
