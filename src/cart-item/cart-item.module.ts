import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemController } from 'src/cart-item/cart-item.controller';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { CartItem } from 'src/database/entity/cart-item.entity';
import { PackageModule } from 'src/package/package.module';
import { SubscriptionDurationModule } from 'src/subscription-duration/subscription-duration.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItem]),
    UserModule,
    PackageModule,
    SubscriptionDurationModule,
  ],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService],
})
export class CartItemModule {}
