import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
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
import { CartItemService } from 'src/cart-item/cart-item.service';
import { ApiResponseFormat } from 'src/common/dto/api-response.dto';
import { CreateCartItemDto } from 'src/dto/cart-item.dto';

@ApiTags('Cart Item')
@Controller('cart-items')
@ApiBearerAuth()
export class CartItemController {
  constructor(private readonly cartItemServicce: CartItemService) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create Cart Item' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 422,
    description: 'Cart Item already exists',
  })
  async registerUser(@Request() req, @Body() cartItemDto: CreateCartItemDto) {
    const { id } = req.user;
    const data = await this.cartItemServicce.createCartItem(id, cartItemDto);

    return new ApiResponseFormat(200, 'success', data);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get Cart Items' })
  @ApiResponse({ status: 200, description: 'success' })
  async getAll(@Request() req) {
    const { id } = req.user;
    const data = await this.cartItemServicce.getCartItemsByUserId(id);

    return new ApiResponseFormat(200, 'success', data);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete cart item By User Id And Package Id' })
  @ApiResponse({ status: 200, description: 'success' })
  @ApiResponse({
    status: 404,
    description: 'not found cart item',
  })
  async deleteOne(@Request() req, @Query('package_id') package_id: number) {
    const { id } = req.user;
    await this.cartItemServicce.removeCartItemsByUserIdAndPackageId(
      id,
      package_id,
    );

    return new ApiResponseFormat(200, 'success', null);
  }
}
