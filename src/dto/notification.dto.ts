import { ApiProperty } from '@nestjs/swagger';
import { Subscription } from 'rxjs';

export class NotificationDto {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: 'message' })
  message: string;

  @ApiProperty({ description: 'subscription' })
  subscription: Subscription;

  @ApiProperty({ description: 'is read' })
  is_read: boolean;

  @ApiProperty({ description: 'created at' })
  created_at: number;
}
