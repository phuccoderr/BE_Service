import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiResponseFormat } from 'src/common/dto/api-response.dto';
import { UpdateSubscriptionDto } from 'src/dto/subscription.dto';
import { SubscriptionService } from 'src/subscription/subscription.service';

@ApiTags('Subscriptions')
@Controller('subscriptions')
@ApiBearerAuth()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get All Subscription' })
  @ApiResponse({ status: 200, description: 'success' })
  async getAllByUser(@Request() req) {
    const { id } = req.user;
    const data = await this.subscriptionService.getAllByUserId(id);

    return new ApiResponseFormat(200, 'success', data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'id subscription' })
  @ApiOperation({ summary: 'Update Subscription' })
  @ApiResponse({ status: 200, description: 'success' })
  async updateSubscription(
    @Param('id') id: number,
    @Body() status: UpdateSubscriptionDto,
  ) {
    const data = await this.subscriptionService.updateStatus(id, status.status);

    return new ApiResponseFormat(200, 'success', data);
  }

  @Get('/test-notification')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'id subscription' })
  @ApiOperation({ summary: 'Test Subscription Notification' })
  @ApiResponse({ status: 200, description: 'success' })
  async testNotification(@Param('id') id: number) {
    const data =
      await this.subscriptionService.testSubscriptionNotification(id);

    return new ApiResponseFormat(200, 'success', data);
  }
}
