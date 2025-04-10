import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestOrder } from 'src/database/entity/guest-order.entity';
import { RevenueController } from 'src/revenue/revenue.controller';
import { RevenueService } from 'src/revenue/revenue.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuestOrder])],
  controllers: [RevenueController],
  providers: [RevenueService],
  exports: [RevenueService],
})
export class RevenueModule {}
