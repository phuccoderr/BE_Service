import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GuestOrder } from 'src/database/entity/guest-order.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class RevenueService {
  constructor(
    @InjectRepository(GuestOrder)
    private guestOrderRepository: Repository<GuestOrder>,
  ) {}

  async getRevenueChartData(
    period: '30days' | '6months' | '1year',
  ): Promise<any> {
    const today = new Date();
    let startDate: Date;
    let groupFormat: string;
    let dateFormat: string;

    switch (period) {
      case '30days':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 30);
        groupFormat = 'YYYY-MM-DD';
        dateFormat = 'DD/MM';
        break;
      case '6months':
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 6);
        groupFormat = 'YYYY-MM-DD';
        dateFormat = 'DD/MM';
        break;
      case '1year':
        startDate = new Date(today);
        startDate.setFullYear(today.getFullYear() - 1);
        groupFormat = 'YYYY-MM';
        dateFormat = 'MM/YYYY';
        break;
      default:
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 30);
        groupFormat = 'YYYY-MM-DD';
        dateFormat = 'DD/MM';
    }

    // Convert dates to timestamps for comparison
    const startTimestamp = Math.floor(startDate.getTime() / 1000);
    const endTimestamp = Math.floor(today.getTime() / 1000);

    // Fetch completed orders within the time range
    const orders = await this.guestOrderRepository.find({
      where: {
        created_at: Between(startTimestamp, endTimestamp),
        order_status: 'completed',
      },
      select: ['created_at', 'total_amount'],
    });

    // Process data for chart
    const revenueByDate = new Map();
    const dateLabels: any = [];

    // Generate all dates in the range
    let currentDate = new Date(startDate);
    while (currentDate <= today) {
      let dateKey;
      let dateLabel;

      if (period === '1year') {
        dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
        dateLabel = `${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;

        // For yearly view, increment by month
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(currentDate.getMonth() + 1);
        currentDate = nextMonth;
      } else {
        dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
        dateLabel = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

        // For daily view, increment by day
        const nextDay = new Date(currentDate);
        nextDay.setDate(currentDate.getDate() + 1);
        currentDate = nextDay;
      }

      revenueByDate.set(dateKey, 0);
      dateLabels.push(dateLabel);
    }

    // Sum up order amounts by date
    orders.forEach((order) => {
      const orderDate = new Date(order.created_at * 1000);
      let dateKey;

      if (period === '1year') {
        dateKey = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`;
      } else {
        dateKey = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}-${String(orderDate.getDate()).padStart(2, '0')}`;
      }

      if (revenueByDate.has(dateKey)) {
        revenueByDate.set(
          dateKey,
          revenueByDate.get(dateKey) + Number(order.total_amount),
        );
      }
    });

    // Convert the map to arrays for the chart
    const revenueData = Array.from(revenueByDate.values());

    return {
      labels: dateLabels,
      data: revenueData,
    };
  }
}
