import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import {
  CreateSubscriptionDurationDto,
  UpdateSubscriptionDurationDto,
} from 'src/dto/subscription-duration.dto';
import { SubscriptionDurationService } from 'src/subscription-duration/subscription-duration.service';

@ApiTags('Subscription Duration')
@Controller('subscription-durations')
@ApiBearerAuth()
export class SubscriptionDurationController {
  constructor(
    private readonly subscriptionDurationService: SubscriptionDurationService,
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Create Subscription Duration' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 422,
    description: 'Subscript duration already exists',
  })
  async registerUser(
    @Body() subscriptionDurationDto: CreateSubscriptionDurationDto,
  ) {
    const data =
      await this.subscriptionDurationService.createSubscriptionDuration(
        subscriptionDurationDto,
      );

    return new ApiResponseFormat(200, 'success', data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'id subscription duration',
  })
  @ApiOperation({ summary: 'Update Subscript Duration By Id' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 404,
    description: 'not found subscription duration',
  })
  async updateOne(
    @Param('id') id: number,
    @Body() subscriptionDuration: UpdateSubscriptionDurationDto,
  ) {
    await this.subscriptionDurationService.updateSubscriptionDuration(
      id,
      subscriptionDuration,
    );
    return new ApiResponseFormat(200, 'success', null);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find All Subscription Duration' })
  @ApiResponse({ status: 200, description: 'success' })
  async getAll() {
    const data = await this.subscriptionDurationService.findAll();

    return new ApiResponseFormat(200, 'success', data);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'id subscription duration',
  })
  @ApiOperation({ summary: 'Get Subscription Duration By Id' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 404,
    description: 'not found subscription duration',
  })
  async getOne(@Param('id') id: number) {
    const data = await this.subscriptionDurationService.findOneById(id);

    return new ApiResponseFormat(200, 'success', data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'id subscription duration',
  })
  @ApiOperation({ summary: 'Delete Subscription Duration By Id' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 404,
    description: 'not found subscription duration',
  })
  async deleteOne(@Param('id') id: number) {
    await this.subscriptionDurationService.deleteOneById(id);

    return new ApiResponseFormat(200, 'success', null);
  }
}
