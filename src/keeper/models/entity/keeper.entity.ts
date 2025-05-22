import { Animal } from 'src/animal/models/entity/animal.entity';
import { TransferRecords } from 'src/transfer-records/models/entity/transfer-records.entity';
import {
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity()
export class Keeper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', type: 'varchar' })
  fullName: string;

  @Column({ name: 'shift', type: 'varchar' })
  shift: string;

  @OneToMany(() => TransferRecords, (transferRecords) => transferRecords.keeper)
  transferRecords: TransferRecords[];

  @ManyToMany(() => Animal)
  @JoinTable()
  animals: Animal[];
}
