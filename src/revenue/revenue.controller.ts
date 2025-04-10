import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiResponseFormat } from 'src/common/dto/api-response.dto';
import { RevenueService } from 'src/revenue/revenue.service';

@ApiTags('Revenue')
@Controller('revenue')
@ApiBearerAuth()
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Get('chart')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get All Revenue' })
  @ApiResponse({ status: 200, description: 'success' })
  async getRevenueChartData(
    @Query('period') period: '30days' | '6months' | '1year' = '30days',
  ) {
    const data = await this.revenueService.getRevenueChartData(period);

    return new ApiResponseFormat(200, 'success', data);
  }
}
