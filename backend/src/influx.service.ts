import { Injectable } from '@nestjs/common';
import { InfluxDB, WriteApi } from '@influxdata/influxdb-client';

@Injectable()
export class InfluxService {
  private client: InfluxDB;

  constructor() {
    const token =
      process.env.INFLUXDB_TOKEN ||
      'XWWMQnTM-mHdhnWAwmLn-awX5ESDz4lho_Wr7TEIGJETZmFdjvkox1TpCUFfa3ZSkKYbGDgLQbThfymhyRg8SQ==';
    const url = 'http://localhost:8086';
    this.client = new InfluxDB({ url, token });
  }

  getWriteClient(): WriteApi {
    return this.client.getWriteApi('monitoring', 'monitoringDB', 'ns');
  }

  async query(query: string): Promise<any> {
    const queryApi = this.client.getQueryApi('monitoring');
    const result = await queryApi.queryRows(query, {
      next(row: string[], tableMeta: any) {
        const o = tableMeta.toObject(row);
        console.log(JSON.stringify(o, null, 2));
      },
      error(error: Error) {
        console.error(error);
        console.log('\nFinished ERROR');
      },
      complete() {
        console.log('\nFinished SUCCESS');
      },
    });
    return result;
  }
}
