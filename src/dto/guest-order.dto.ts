import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { GuestOrderItem } from 'src/database/entity/guest-order-item.entity';
import { User } from 'src/database/entity/user.entity';

enum PaymentMethod {
  cod = 'cod',
  'bank-transfer' = 'bank-transfer',
}

enum OrderStatus {
  pending = 'pending',
  processing = 'processing',
  completed = 'completed',
  cancelled = 'cancelled',
}

export class CreateGuestOrderDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'full name', example: 'full name' })
  full_name: string;

  @IsEmail()
  @ApiProperty({ description: 'email', example: 'email' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'phone number', example: 'phone number' })
  phone_number: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'address', example: 'address' })
  address: string;

  @IsEnum(PaymentMethod)
  @ApiProperty({
    type: 'string',
    enum: ['cod', 'bank-transfer'],
    description: 'payment method',
    example: 'cod',
  })
  payment_method: 'cod' | 'bank-transfer';
}

export class UpdateStatusGuestOrderDto {
  @IsEnum(OrderStatus)
  @ApiProperty({
    type: 'string',
    enum: ['pending', 'processing', 'completed', 'cancelled'],
  })
  order_status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

export class GuestOrderDto {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: 'user' })
  user: User;

  @ApiProperty({ description: 'full name', example: 'full name' })
  full_name: string;

  @ApiProperty({ description: 'email', example: 'email' })
  email: string;

  @ApiProperty({ description: 'phone number', example: 'phone number' })
  phone_number: string;

  @ApiProperty({ description: 'address', example: 'address' })
  address: string;

  @ApiProperty({ description: 'total amount', example: 1000 })
  total_amount: number;

  @ApiProperty({ description: 'payment method', example: 'payment method' })
  payment_method: string;

  @ApiProperty({ description: 'order item' })
  guest_order_item: GuestOrderItem[];
}
