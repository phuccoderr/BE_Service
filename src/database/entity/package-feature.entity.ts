import { Package } from 'src/database/entity/packages.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('package_features')
export class PackageFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Package)
  @JoinColumn({ name: 'package_id' })
  package: Package;

  @Column()
  name: string;

  @Column()
  value: string;
}
