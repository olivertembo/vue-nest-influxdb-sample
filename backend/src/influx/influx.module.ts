import { Module } from '@nestjs/common';
import { InfluxService } from './influx.service';

@Module({
  providers: [InfluxService],
  exports: [InfluxService],
})
export class InfluxModule {}
