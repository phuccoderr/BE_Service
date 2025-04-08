import { Package } from 'src/database/entity/packages.entity';
import { SubscriptionDuration } from 'src/database/entity/subscription-duration.entity';
import { User } from 'src/database/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Package, { nullable: false })
  @JoinColumn({ name: 'package_id' })
  package: Package;

  @ManyToOne(() => SubscriptionDuration, { nullable: false })
  @JoinColumn({ name: 'duration_id' })
  subscription_duration: SubscriptionDuration;
}
