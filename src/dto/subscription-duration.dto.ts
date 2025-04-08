import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateSubscriptionDurationDto {
  @IsNumber()
  @Min(1)
  @ApiProperty({ description: 'months', example: 1 })
  months: number;

  @IsNumber()
  @ApiProperty({ description: 'discount percentage', example: 1 })
  discount_percentage: number;
}

export class UpdateSubscriptionDurationDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({ description: 'months', example: 1 })
  months: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'discount percentage', example: 1 })
  discount_percentage: number;
}

export class SubscriptionDurationDto {
  @ApiProperty({ description: 'id', example: 1 })
  id: number;

  @ApiProperty({ description: 'months', example: 1 })
  months: number;

  @ApiProperty({ description: 'discount percentage', example: 1 })
  discount_percentage: number;
}
