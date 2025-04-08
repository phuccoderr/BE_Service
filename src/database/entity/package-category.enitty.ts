import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('package_categories')
export class PackageCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'boolean', default: true })
  is_actived: boolean;

  // @OneToMany(() => Package, (packages) => packages.package_category)
  // package: Package[];
}
