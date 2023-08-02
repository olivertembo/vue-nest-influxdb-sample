import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InfluxDB, IPoint, IResults } from 'influx';

@Injectable()
export class InfluxService {
  constructor(@Inject('INFLUXDB') private readonly influx: InfluxDB) {}

  async seedDummyData() {
    const dataPoints: IPoint[] = [
      {
        measurement: 'temperature',
        tags: { device: 'device1' },
        fields: { value: 23.5 },
        timestamp: new Date().getTime() * 1000000, // InfluxDB expects timestamps in nanoseconds
      },
      {
        measurement: 'temperature',
        tags: { device: 'device2' },
        fields: { value: 25.0 },
        timestamp: (new Date().getTime() + 1000) * 1000000,
      },
    ];

    await this.influx.writePoints(dataPoints);
  }

  async getDataByDateRange(
    measurement: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<IResults<any>> {
    let query = `SELECT * FROM ${measurement}`;

    return this.influx.query(query);

    if (!startDate || !endDate) {
      startDate = new Date('2020-08-01T00:00:00Z');
      endDate = new Date('2023-08-02T00:00:00Z');
    }

    query += ` WHERE time >= '${startDate.toISOString()}' AND time <= '${endDate.toISOString()}'`;

    return this.influx.query(query);
  }
}
