import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemModule } from 'src/cart-item/cart-item.module';
import { GuestOrderItem } from 'src/database/entity/guest-order-item.entity';
import { GuestOrder } from 'src/database/entity/guest-order.entity';
import { Subscription } from 'src/database/entity/subscription.entity';
import { GuestOrderController } from 'src/guest-order/guest-order.controller';
import { GuestOrderService } from 'src/guest-order/guest-order.service';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GuestOrder, GuestOrderItem]),
    CartItemModule,
    UserModule,
    SubscriptionModule,
  ],
  controllers: [GuestOrderController],
  providers: [GuestOrderService],
  exports: [GuestOrderService],
})
export class GuestOrderModule {}
