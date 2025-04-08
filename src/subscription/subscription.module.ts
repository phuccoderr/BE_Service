import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from 'src/database/entity/subscription.entity';
import { GuestOrderModule } from 'src/guest-order/guest-order.module';
import { NotificationModule } from 'src/notification/notification.module';
import { SubscriptionController } from 'src/subscription/subscription.controller';
import { SubscriptionService } from 'src/subscription/subscription.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription]), NotificationModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
