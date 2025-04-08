import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { SubscriptionDuration } from 'src/database/entity/subscription-duration.entity';
import {
  CreateSubscriptionDurationDto,
  UpdateSubscriptionDurationDto,
} from 'src/dto/subscription-duration.dto';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionDurationService {
  constructor(
    @InjectRepository(SubscriptionDuration)
    private readonly subscriptionDurationRepository: Repository<SubscriptionDuration>,
  ) {}

  // Create Subscription Duration
  async createSubscriptionDuration(
    subscriptionDurationDto: CreateSubscriptionDurationDto,
  ) {
    try {
      const data = await this.subscriptionDurationRepository.save(
        subscriptionDurationDto,
      );
      return plainToClass(SubscriptionDuration, data);
    } catch (error) {
      throw new UnprocessableEntityException(
        'Subscription duration already exists',
      );
    }
  }

  // Update Subscription Duration
  async updateSubscriptionDuration(
    id: number,
    subscriptionDurationDto: UpdateSubscriptionDurationDto,
  ) {
    try {
      await this.subscriptionDurationRepository.update(
        id,
        subscriptionDurationDto,
      );
    } catch (error) {
      throw new NotFoundException('Package feature not found');
    }
  }

  // Get All
  async findAll() {
    const subscriptionDurations =
      await this.subscriptionDurationRepository.find({
        order: { months: 'ASC' },
      });
    return subscriptionDurations.map((item) =>
      plainToClass(SubscriptionDuration, item),
    );
  }

  // Get By Id
  async findOneById(id: number) {
    const subscriptionDuration =
      await this.subscriptionDurationRepository.findOne({
        where: { id },
      });
    if (!subscriptionDuration) {
      throw new UnprocessableEntityException('Subscription duration not found');
    }
    return plainToClass(SubscriptionDuration, subscriptionDuration);
  }

  // Delete By Id
  async deleteOneById(id: number) {
    try {
      const deleteSubscriptionDuration =
        await this.subscriptionDurationRepository.delete({
          id,
        });
      if (deleteSubscriptionDuration.affected === 0) {
        throw new NotFoundException('Subscription duration not found');
      }
    } catch (error) {
      throw new UnprocessableEntityException(
        'Cannot delete Subscription duration',
      );
    }
  }
}
