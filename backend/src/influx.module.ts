import { Module } from '@nestjs/common';
import { InfluxDB, FieldType } from 'influx';

@Module({
  providers: [
    {
      provide: 'INFLUXDB',
      useValue: new InfluxDB({
        host: 'localhost',
        database: 'monitoringDB',
        username: 'admin',
        password: 'adminpassword',
        schema: [
          {
            measurement: 'solar',
            fields: {
              power: FieldType.FLOAT,
              voltage: FieldType.FLOAT,
            },
            tags: ['host'],
          },
          {
            measurement: 'battery',
            fields: {
              power: FieldType.FLOAT,
              voltage: FieldType.FLOAT,
            },
            tags: ['host'],
          },
          {
            measurement: 'load',
            fields: {
              power: FieldType.FLOAT,
              voltage: FieldType.FLOAT,
            },
            tags: ['host'],
          },
        ],
      }),
    },
  ],
  exports: ['INFLUXDB'],
})
export class InfluxModule {}
