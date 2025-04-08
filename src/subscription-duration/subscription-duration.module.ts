import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionDuration } from 'src/database/entity/subscription-duration.entity';
import { SubscriptionDurationController } from 'src/subscription-duration/subscription-duration.controller';
import { SubscriptionDurationService } from 'src/subscription-duration/subscription-duration.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionDuration])],
  controllers: [SubscriptionDurationController],
  providers: [SubscriptionDurationService],
  exports: [SubscriptionDurationService],
})
export class SubscriptionDurationModule {}
