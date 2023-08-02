import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { InfluxService } from './influx.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth/auth.guard';
import * as moment from 'moment';
import { IResults } from 'influx';

@ApiTags('Voltage/Power')
@Controller('data')
export class InfluxController {
  constructor(private readonly influxService: InfluxService) {}

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
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

  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard)
  @Get('time-series')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: Object,
  })
  async getDataByDateRange(
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const measurement = 'voltage';
    const startDate = from ? new Date(from) : undefined;
    const endDate = to ? new Date(to) : undefined;
    return this.influxService.getDataByDateRange(
      measurement,
      startDate,
      endDate,
    );
  }
}
