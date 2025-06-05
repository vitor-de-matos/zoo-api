import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome', type: 'varchar', length: 250, unique: true })
  name: string;

  @Column({ name: 'login', type: 'varchar', length: 100, unique: true })
  login: string;

  @Column({ name: 'senha', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'ativo', type: 'boolean', default: true })
  active: boolean;

  @Column({ name: 'nivel_permissao', type: 'smallint' })
  permissionLevel: number;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  createdAt: Date;
}
