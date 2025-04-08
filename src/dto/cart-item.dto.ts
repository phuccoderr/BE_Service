import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Package } from 'src/database/entity/packages.entity';
import { SubscriptionDuration } from 'src/database/entity/subscription-duration.entity';
import { User } from 'src/database/entity/user.entity';

export class CreateCartItemDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'package id', example: 1 })
  package_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'subscription duration id', example: 1 })
  subscription_duration_id: number;
}

export class CartItemDto {
  @ApiProperty({ description: 'id', example: 1 })
  id: number;

  @ApiProperty({ description: 'user' })
  user: User;

  @ApiProperty({ description: 'package' })
  package: Package;

  @ApiProperty({ description: 'subscription duration' })
  subscription_duration: SubscriptionDuration;
}
