import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
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
import {
  CreateGuestOrderDto,
  UpdateStatusGuestOrderDto,
} from 'src/dto/guest-order.dto';
import { GuestOrderService } from 'src/guest-order/guest-order.service';

@ApiTags('Guest Order')
@Controller('guest-orders')
export class GuestOrderController {
  constructor(private readonly guestOrderService: GuestOrderService) {}

  @Post('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Payment Guest Order' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({ status: 422, description: 'Guest Order already exists' })
  async registerUser(
    @Request() req,
    @Body() guestOrderDto: CreateGuestOrderDto,
  ) {
    const { id } = req.user;
    const data = await this.guestOrderService.createGuestOrder(
      id,
      guestOrderDto,
    );

    return new ApiResponseFormat(200, 'success', data);
  }

  @Get('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all guest order' })
  @ApiResponse({
    status: 200,
    description: 'info guest orders',
  })
  async findAll() {
    const data = await this.guestOrderService.findAll();

    return new ApiResponseFormat(200, 'success', data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'id guest order' })
  @ApiOperation({ summary: 'Update Order Status By Id' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 422,
    description: 'cannot change order status',
  })
  async updateOne(
    @Param('id') id: number,
    @Body() guestOrderDto: UpdateStatusGuestOrderDto,
  ) {
    console.log(guestOrderDto);
    await this.guestOrderService.changeOrderStatus(
      id,
      guestOrderDto.order_status,
    );
    return new ApiResponseFormat(200, 'success', null);
  }

  @Get('/user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get guest order by user' })
  @ApiResponse({
    status: 200,
    description: 'info guest order',
  })
  async findAllByUser(@Request() req) {
    const { id } = req.user;
    const data = await this.guestOrderService.findAllByUserId(id);

    return new ApiResponseFormat(200, 'success', data);
  }

  @Get('/items/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: Number, description: 'id guest order' })
  @ApiOperation({ summary: 'Get guest order items by guest id' })
  @ApiResponse({
    status: 200,
    description: 'info guest order items',
  })
  async findAllGuestOrderItemByGuestOrderId(@Param('id') id: number) {
    const data =
      await this.guestOrderService.findAllGuestOrderItemsByGuestId(id);

    return new ApiResponseFormat(200, 'success', data);
  }
}
