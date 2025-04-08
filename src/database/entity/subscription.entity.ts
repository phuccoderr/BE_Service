import { GuestOrderItem } from 'src/database/entity/guest-order-item.entity';
import { Package } from 'src/database/entity/packages.entity';
import { User } from 'src/database/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Package, { nullable: false })
  @JoinColumn({ name: 'package_id' })
  package: Package;

  @ManyToOne(() => GuestOrderItem, { nullable: false })
  @JoinColumn({ name: 'guest_order_item_id' })
  guest_order_item: GuestOrderItem;

  @Column({ type: 'int' })
  start_date: number;

  @Column({ type: 'int' })
  end_date: number;

  @Column({
    type: 'enum',
    enum: ['active', 'expired', 'cancelled'],
    default: 'active',
  })
  status: string;

  @Column({ type: 'int', nullable: true })
  data_remaining: number;
}
