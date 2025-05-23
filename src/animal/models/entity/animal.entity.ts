import { Habitat } from 'src/habitat/models/entity/habitat.entity';
import { Keeper } from 'src/keeper/models/entity/keeper.entity';
import { MeasurementRecord } from 'src/measurement-record/models/entity/measurement-record.entity';
import { MedicalRecord } from 'src/medical-record/models/entity/medical-record.entity';
import { Nutrition } from 'src/nutrition/models/entity/nutrition.entity';
import { QuarantineRecord } from 'src/quarentine-record/models/entity/quarentine-record.entity';
import { Species } from 'src/species/models/entity/species.entity';
import { TransferRecords } from 'src/transfer-records/models/entity/transfer-records.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'age', type: 'smallint' })
  age: number;

  @Column({ name: 'gender', type: 'varchar', nullable: true })
  gender: string;

  @ManyToOne(() => Species, (species) => species.animals)
  @JoinColumn({ name: 'id_species' })
  species: Species;

  @ManyToOne(() => Habitat, (habitat) => habitat.animals)
  @JoinColumn({ name: 'id_habitat' })
  habitat: Habitat;

  @OneToMany(() => TransferRecords, (transferRecords) => transferRecords.animal)
  transferRecords: TransferRecords[];

  @OneToMany(() => Nutrition, (nutrition) => nutrition.animal)
  nutritions: Nutrition[];

  @OneToMany(
    () => QuarantineRecord,
    (quarantineRecord) => quarantineRecord.animal,
  )
  quarantineRecords: QuarantineRecord[];

  @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.animal)
  medicalRecords: MedicalRecord[];

  @OneToMany(() => MeasurementRecord, (measurement) => measurement.animal)
  measurements: MeasurementRecord[];

  @ManyToMany(() => Keeper, (keeper) => keeper.animals)
  keepers: Keeper[];
}
