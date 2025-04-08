import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CartItem } from 'src/database/entity/cart-item.entity';
import { CartItemDto, CreateCartItemDto } from 'src/dto/cart-item.dto';
import { PackageService } from 'src/package/package.service';
import { SubscriptionDurationService } from 'src/subscription-duration/subscription-duration.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly userService: UserService,
    private readonly packageService: PackageService,
    private readonly subscriptionDurationService: SubscriptionDurationService,
  ) {}

  // Create CartItem
  async createCartItem(userId: number, cartItemDto: CreateCartItemDto) {
    const { package_id, subscription_duration_id } = cartItemDto;
    const user = await this.userService.findOneById(userId);
    const packages = await this.packageService.findOneById(package_id);
    const subscriptionDuration =
      await this.subscriptionDurationService.findOneById(
        subscription_duration_id,
      );

    const cartItem = await this.cartItemRepository.findOne({
      where: { user, package: packages },
    });
    if (cartItem) {
      throw new UnprocessableEntityException('Cart item already exists');
    }

    try {
      const data = await this.cartItemRepository.save({
        user,
        package: packages,
        subscription_duration: subscriptionDuration,
      });
      return plainToClass(CartItemDto, data);
    } catch (error) {
      throw new UnprocessableEntityException('Cart item already exists');
    }
  }

  // Get By User Id
  async getCartItemsByUserId(userId: number) {
    const user = await this.userService.findOneById(userId);
    const cartItems = await this.cartItemRepository.find({
      where: { user: user },
      relations: [
        'package',
        'subscription_duration',
        'package.package_feature',
        'package.package_category',
      ],
    });
    return cartItems.map((item) => plainToClass(CartItemDto, item));
  }

  // Remove By Ids
  async removeCartItemsByUserId(userId: number) {
    const user = await this.userService.findOneById(userId);
    try {
      const deleteCartItem = await this.cartItemRepository.delete({ user });
      return plainToClass(CartItemDto, deleteCartItem);
    } catch (error) {
      throw new UnprocessableEntityException(
        'Cannot delete cartItem by user Id',
      );
    }
  }

  // Remove By User Id And Package Id
  async removeCartItemsByUserIdAndPackageId(userId: number, packageId: number) {
    const user = await this.userService.findOneById(userId);
    const packages = await this.packageService.findOneById(packageId);
    try {
      const deleteCartItem = await this.cartItemRepository.delete({
        user,
        package: packages,
      });
      if (deleteCartItem.affected === 0) {
        throw new NotFoundException('CartItem not found');
      }
    } catch (error) {
      throw new UnprocessableEntityException(
        'Cannot delete cartItem by user Id and package Id',
      );
    }
  }
}
