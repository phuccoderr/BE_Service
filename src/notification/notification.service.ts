import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Notification } from 'src/database/entity/notification.entity';
import { Subscription } from 'src/database/entity/subscription.entity';
import { NotificationDto } from 'src/dto/notification.dto';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async createNotification(subscription: Subscription) {
    try {
      await this.notificationRepository.save({
        subscription: subscription,
        created_at: Math.floor(Date.now() / 1000),
        user: subscription.user,
        message:
          'Đăng ký của bạn sẽ hết hạn sau 1 ngày. Vui lòng gia hạn đăng ký của bạn.',
        is_read: false,
      });
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('Cannot create notification');
    }
  }

  async findAllByUserId(userId: number) {
    const notifications = await this.notificationRepository.find({
      where: { user: { id: userId } },
      relations: ['subscription', 'subscription.package'],
    });
    return notifications.map((item) => plainToClass(NotificationDto, item));
  }
}
