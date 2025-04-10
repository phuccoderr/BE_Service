import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CartItemModule } from 'src/cart-item/cart-item.module';
import { DatabaseModule } from 'src/database/database.module';
import { GuestOrderModule } from 'src/guest-order/guest-order.module';
import { MailModule } from 'src/mail/mail.module';
import { NotificationModule } from 'src/notification/notification.module';
import { PackageCategoryModule } from 'src/package-category/package-category.module';
import { PackageFeatureModule } from 'src/package-feature/package-feature.module';
import { PackageModule } from 'src/package/package.module';
import { RevenueModule } from 'src/revenue/revenue.module';
import { SubscriptionDurationModule } from 'src/subscription-duration/subscription-duration.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';

import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    PackageCategoryModule,
    PackageModule,
    PackageFeatureModule,
    SubscriptionDurationModule,
    CartItemModule,
    GuestOrderModule,
    SubscriptionModule,
    NotificationModule,
    RevenueModule,
    MailModule,
  ],
})
export class AppModule {}
