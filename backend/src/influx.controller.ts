import { Controller, Get } from '@nestjs/common';
import { InfluxService } from './influx.service';

@Controller('data')
export class InfluxController {
  constructor(private readonly influxService: InfluxService) {}

  @Get('seed')
  async seedDummyData() {
    await this.influxService.seedDummyData();
    return { message: 'Dummy data seeded successfully.' };
  }
}
