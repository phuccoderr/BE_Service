import { SubscriptionDurationDto } from './../dto/subscription-duration.dto';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CartItemService } from 'src/cart-item/cart-item.service';
import { GuestOrderItem } from 'src/database/entity/guest-order-item.entity';
import { GuestOrder } from 'src/database/entity/guest-order.entity';
import { GuestOrderItemDto } from 'src/dto/guest-order-item.dto';
import { CreateGuestOrderDto, GuestOrderDto } from 'src/dto/guest-order.dto';
import { PackageDto } from 'src/dto/package.dto';
import { NotificationService } from 'src/notification/notification.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class GuestOrderService {
  constructor(
    @InjectRepository(GuestOrder)
    private readonly guestOrderRepository: Repository<GuestOrder>,
    @InjectRepository(GuestOrderItem)
    private readonly guestOrderItemRepository: Repository<GuestOrderItem>,
    private readonly notificationService: NotificationService,
    private readonly subscriptionService: SubscriptionService,
    private readonly cartItemService: CartItemService,
    private readonly userService: UserService,
  ) {}

  async createGuestOrder(userId: number, guestOrderDto: CreateGuestOrderDto) {
    const user = await this.userService.findOneById(userId);
    const cartItems = await this.cartItemService.getCartItemsByUserId(userId);

    if (cartItems.length === 0) {
      throw new NotFoundException('You dont have cart items');
    }

    const total_amount = cartItems.reduce((total, item) => {
      const priceDiscount = item.package.price * (item.package.discount / 100);
      const price =
        (item.package.price - priceDiscount) *
        item.subscription_duration.months;

      const subscriptionDiscount =
        price * (item.subscription_duration.discount_percentage / 100);
      const result = price - subscriptionDiscount;

      return total + result;
    }, 0);

    try {
      const guestOrder = await this.guestOrderRepository.save({
        ...guestOrderDto,
        total_amount: total_amount,
        user: user,
        order_status: 'pending',
        created_at: Math.floor(Date.now() / 1000),
      });

      const guestOrderItems = cartItems.map((item) => ({
        guest_order: guestOrder,
        package: item.package,
        subscription_duration: item.subscription_duration,
        price_at_purchase: this.calcPriceAtPurchase(
          item.package,
          item.subscription_duration,
        ),
      }));

      await this.guestOrderItemRepository.save(guestOrderItems);

      await this.cartItemService.removeCartItemsByUserId(userId);

      return plainToClass(GuestOrderDto, guestOrder);
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('Guest order already exists');
    }
  }

  // update order status
  async changeOrderStatus(id: number, status: string) {
    try {
      await this.guestOrderRepository.update(id, { order_status: status });

      if (status === 'completed') {
        const guestOrder = await this.findOneById(id);
        const listSubscriptions =
          await this.subscriptionService.createSubscription(guestOrder);
        console.log(listSubscriptions);
        listSubscriptions.forEach(
          async (item) =>
            await this.notificationService.createNotification(
              item,
              'Đăng ký gói cước thành công, cảm ơn bạn',
            ),
        );
      }
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('Cannot change order status');
    }
  }

  async findAll() {
    const guestOrders = await this.guestOrderRepository.find();
    return guestOrders.map((item) => plainToClass(GuestOrderDto, item));
  }

  async findAllByUserId(userId: number) {
    const user = await this.userService.findOneById(userId);
    const guestOrders = await this.guestOrderRepository.find({
      where: { user },
      relations: ['guest_order_item', 'guest_order_item.package'],
    });
    return guestOrders.map((item) => plainToClass(GuestOrderDto, item));
  }

  async findOneById(id: number) {
    const guestOrder = await this.guestOrderRepository.findOne({
      where: { id },
      relations: [
        'user',
        'guest_order_item',
        'guest_order_item.package',
        'guest_order_item.subscription_duration',
      ],
    });
    if (!guestOrder) {
      throw new NotFoundException('Guest order not found');
    }
    return plainToClass(GuestOrderDto, guestOrder);
  }

  async findAllGuestOrderItemsByGuestId(guestId: number) {
    const guestOrder = await this.findOneById(guestId);
    const guestOrderItems = await this.guestOrderItemRepository.find({
      where: { guest_order: guestOrder },
      relations: ['package', 'subscription_duration'],
    });

    return guestOrderItems.map((item) => plainToClass(GuestOrderItemDto, item));
  }

  calcPriceAtPurchase(
    packagee: PackageDto,
    subscriptionDuration: SubscriptionDurationDto,
  ) {
    const priceDiscount = packagee.price * (packagee.discount / 100);
    const price =
      (packagee.price - priceDiscount) * subscriptionDuration.months;

    const subscriptionDiscount =
      price * (subscriptionDuration.discount_percentage / 100);
    const result = price - subscriptionDiscount;
    return result;
  }
}
