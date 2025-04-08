import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Subscription } from 'src/database/entity/subscription.entity';
import { GuestOrderDto } from 'src/dto/guest-order.dto';
import { SubscriptionDto } from 'src/dto/subscription.dto';
import { NotificationService } from 'src/notification/notification.service';
import { Repository } from 'typeorm';
import { differenceInDays } from 'date-fns';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly notificationService: NotificationService,
  ) {}

  async createSubscription(guestOrder: GuestOrderDto) {
    try {
      guestOrder.guest_order_item.map(async (item) => {
        const startDate = Math.floor(Date.now() / 1000);

        const currentDate = new Date();
        currentDate.setMonth(
          currentDate.getMonth() + item.subscription_duration.months,
        );
        const endDate = Math.floor(currentDate.getTime() / 1000);

        await this.subscriptionRepository.save({
          user: guestOrder.user,
          package: item.package,
          guest_order_item: item,
          subscription_duration: item.subscription_duration,
          start_date: startDate,
          end_date: endDate,
          status: 'active',
          data_remaining: item.package.data_amount,
        });
      });
    } catch (error) {
      throw new UnprocessableEntityException('Cannot create subscription');
    }
  }

  async getAllByUserId(userId: number) {
    try {
      const subscriptions = await this.subscriptionRepository.find({
        where: {
          user: {
            id: userId,
          },
        },
        relations: ['package'],
      });
      return subscriptions.map((item) => plainToClass(SubscriptionDto, item));
    } catch (error) {
      throw new UnprocessableEntityException('Cannot get subscriptions');
    }
  }

  async testSubscriptionNotification(subscriptionId: number) {
    const subscription = await this.subscriptionRepository.findOne({
      where: {
        id: subscriptionId,
      },
      relations: ['user'],
    });
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    await this.notificationService.createNotification(subscription);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Chạy mỗi ngày vào nửa đêm
  async checkAndCreateNotification() {
    const subscriptions = await this.subscriptionRepository.find({
      where: { status: 'active' },
      relations: ['user'],
    });

    const currentDate = new Date();

    for (const subscription of subscriptions) {
      const endDate = new Date(subscription.end_date * 1000);

      // Tính sự chênh lệch giữa endDate và ngày hiện tại
      const remainingTimeInDays = differenceInDays(endDate, currentDate);

      // Nếu còn 1 ngày nữa, tạo thông báo
      if (remainingTimeInDays <= 1 && remainingTimeInDays > 0) {
        await this.notificationService.createNotification(subscription);
      }
    }
  }
}
