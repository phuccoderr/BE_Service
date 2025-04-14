import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';
import { Package } from 'src/database/entity/packages.entity';

enum SubscriptionStatus {
  active = 'active',
  expired = 'expired',
  cancelled = 'cancelled',
}
export class CreateSubscriptionDto {
  @IsNumber()
  @Min(1)
  @ApiProperty({ description: 'guest order id', example: 1 })
  guest_order_id: number;
}

export class UpdateSubscriptionDto {
  @IsString()
  @ApiProperty({ description: 'status', example: 'active' })
  status: SubscriptionStatus;
}

export class SubscriptionDto {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: 'package' })
  package: Package;

  @ApiProperty({ description: 'start date' })
  start_date: number;

  @ApiProperty({ description: 'end date' })
  end_date: number;

  @ApiProperty({ description: 'status' })
  status: SubscriptionStatus;

  @ApiProperty({ description: 'data remaining' })
  data_remaining: number;
}
