import { Animal } from 'src/animal/models/entity/animal.entity';
import { Keeper } from 'src/keeper/models/entity/keeper.entity';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Entity,
  Column,
} from 'typeorm';

@Entity()
export class TransferRecords {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'from_location', type: 'varchar' })
  fromLocation: string;

  @Column({ name: 'to_location', type: 'varchar' })
  toLocation: string;

  @Column({ name: 'transfer-date', type: 'timestamptz' })
  transferDate: Date;

  @Column({ name: 'reason', type: 'varchar', nullable: true })
  reason?: string;

  @Column({ name: 'notes', type: 'varchar', nullable: true })
  notes?: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => Animal, (animal) => animal.transferRecords)
  @JoinColumn({ name: 'id_animal' })
  animal: Animal;

  @ManyToOne(() => Keeper, (keeper) => keeper.transferRecords)
  @JoinColumn({ name: 'id_keeper' })
  keeper: Keeper;
}
