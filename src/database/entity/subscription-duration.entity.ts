import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subscription_durations')
export class SubscriptionDuration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true })
  months: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  discount_percentage: number;
}
