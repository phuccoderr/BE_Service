import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiResponseFormat } from 'src/common/dto/api-response.dto';
import { NotificationService } from 'src/notification/notification.service';

@ApiTags('Notifications')
@Controller('notifications')
@ApiBearerAuth()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get All Notification' })
  @ApiResponse({ status: 200, description: 'success' })
  async getAllByUser(@Request() req) {
    const { id } = req.user;
    const data = await this.notificationService.findAllByUserId(id);

    return new ApiResponseFormat(200, 'success', data);
  }
}
