import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from 'src/database/entity/cart-item.entity';
import { GuestOrderItem } from 'src/database/entity/guest-order-item.entity';
import { GuestOrder } from 'src/database/entity/guest-order.entity';
import { Notification } from 'src/database/entity/notification.entity';
import { PackageCategory } from 'src/database/entity/package-category.enitty';
import { PackageFeature } from 'src/database/entity/package-feature.entity';
import { Package } from 'src/database/entity/packages.entity';
import { SubscriptionDuration } from 'src/database/entity/subscription-duration.entity';
import { Subscription } from 'src/database/entity/subscription.entity';
import { User } from 'src/database/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'mobile_services',
      entities: [
        User,
        PackageCategory,
        Package,
        PackageFeature,
        SubscriptionDuration,
        CartItem,
        GuestOrder,
        GuestOrderItem,
        Subscription,
        Notification,
      ],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
