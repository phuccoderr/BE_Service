import { ApiProperty } from '@nestjs/swagger';
import { GuestOrder } from 'src/database/entity/guest-order.entity';
import { Package } from 'src/database/entity/packages.entity';
import { SubscriptionDuration } from 'src/database/entity/subscription-duration.entity';

export class GuestOrderItemDto {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: 'guest_order' })
  guest_order: GuestOrder;

  @ApiProperty({ description: 'package' })
  package: Package;

  @ApiProperty({ description: 'subscription_duration' })
  subscription_duration: SubscriptionDuration;

  @ApiProperty({ description: 'price at purchase' })
  price_at_purchase: number;
}
