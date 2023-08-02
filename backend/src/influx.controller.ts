import { Controller, Get, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { InfluxService } from './influx.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { IResults } from 'influx';

@ApiTags('data')
@Controller('data')
export class InfluxController {
  constructor(private readonly influxService: InfluxService) {}

  @HttpCode(HttpStatus.OK)
  @Get('seed')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Object,
  })
  async seedDummyData() {
    await this.influxService.seedDummyData();
    return { message: 'Dummy data seeded successfully.' };
  }

  @HttpCode(HttpStatus.OK)
  @Get('time-series')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Object, // Define the response type based on your data model
  })
  async getDataByDateRange(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const measurement = 'your_measurement_name'; // Replace with the actual measurement name
    const startDate = from ? new Date(from) : undefined;
    const endDate = to ? new Date(to) : undefined;
    return this.influxService.getDataByDateRange(
      measurement,
      startDate,
      endDate,
    );
  }
}
