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
import { IResults } from 'influx';
import { Point, WriteApi } from '@influxdata/influxdb-client';

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
    const writeClient: WriteApi = this.influxService.getWriteClient();

    for (let i = 0; i < 5; i++) {
      // Generate dummy data for solar
      const solarPoint = new Point('solar')
        .tag('host', 'device1')
        .floatField('power', Math.random() * 100)
        .floatField('voltage', Math.random() * 50);

      // Generate dummy data for battery
      const batteryPoint = new Point('battery')
        .tag('host', 'device2')
        .floatField('power', Math.random() * 100)
        .floatField('voltage', Math.random() * 50);

      // Generate dummy data for load
      const loadPoint = new Point('load')
        .tag('host', 'device3')
        .floatField('power', Math.random() * 100)
        .floatField('voltage', Math.random() * 50);

      // Write points to InfluxDB
      writeClient.writePoint(solarPoint);
      writeClient.writePoint(batteryPoint);
      writeClient.writePoint(loadPoint);

      // Separate points by 1 second
      setTimeout(() => {
        writeClient.flush();
      }, i * 1000);
    }

    process.on('SIGINT', () => {
      writeClient.flush().then(() => {
        writeClient.close();
        console.log('Exiting...');
        process.exit();
      });
    });

    return { message: 'Dummy data started...' };
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
    const defaultStartDate = new Date();
    const defaultEndDate = new Date();

    const measurement = 'solar,battery,load';
    const startDate = from ? new Date(from) : undefined;
    const endDate = to ? new Date(to) : undefined;

    defaultStartDate.setDate(defaultStartDate.getDate() - 7);

    let query = `SELECT * FROM ${measurement}`;
    query += ` WHERE time >= '${defaultStartDate.toISOString()}' AND time <= '${defaultEndDate.toISOString()}'`;

    if (startDate && endDate) {
      query = `SELECT * FROM ${measurement}`;
      query += ` WHERE time >= '${startDate.toISOString()}' AND time <= '${endDate.toISOString()}'`;
    }

    const results: IResults<any> = await this.influxService.query(query);

    return results;
  }
}
