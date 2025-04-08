import { PackageCategory } from 'src/database/entity/package-category.enitty';
import { PackageFeature } from 'src/database/entity/package-feature.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('packages')
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PackageCategory)
  @JoinColumn({ name: 'package_category_id' })
  package_category: PackageCategory;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  discount: number;

  @Column({ type: 'int' })
  data_amount: number;

  @Column()
  description: string;

  @Column({ type: 'boolean', default: true })
  is_actived: boolean;

  // Cannot fetch

  @OneToMany(() => PackageFeature, (package_feature) => package_feature.package)
  package_feature: PackageFeature[];
}
