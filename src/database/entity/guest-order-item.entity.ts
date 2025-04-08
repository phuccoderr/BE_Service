import { GuestOrder } from 'src/database/entity/guest-order.entity';
import { Package } from 'src/database/entity/packages.entity';
import { SubscriptionDuration } from 'src/database/entity/subscription-duration.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('guest-order-item')
export class GuestOrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => GuestOrder)
  @JoinColumn({ name: 'guest_order_id' })
  guest_order: GuestOrder;

  @ManyToOne(() => Package)
  @JoinColumn({ name: 'package_id' })
  package: Package;

  @ManyToOne(() => SubscriptionDuration)
  @JoinColumn({ name: 'duration_id' })
  subscription_duration: SubscriptionDuration;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price_at_purchase: number;
}
