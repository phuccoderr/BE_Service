import { GuestOrderItem } from 'src/database/entity/guest-order-item.entity';
import { User } from 'src/database/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('guest-orders')
export class GuestOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column({ default: '' })
  phone_number: string;

  @Column({ default: '' })
  address: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_amount: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending',
  })
  order_status: string;

  @Column({ type: 'enum', enum: ['cod', 'bank-transfer'], default: 'cod' })
  payment_method: string;

  @Column({ type: 'int' })
  created_at: number;

  @OneToMany(() => GuestOrderItem, (guest_order) => guest_order.guest_order)
  guest_order_item: GuestOrderItem[];
}
