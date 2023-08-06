import { Injectable } from '@nestjs/common';
import {
  InfluxDB,
  WriteApi,
  FluxTableMetaData,
  FluxResultObserver,
} from '@influxdata/influxdb-client';

interface CustomFluxResultObserver {
  next(row: string[], tableMeta: FluxTableMetaData): void;
  error(error: Error): void;
  complete(): void;
}

@Injectable()
export class InfluxService {
  public client: InfluxDB;

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

  async getLoadData(): Promise<any[]> {
    const queryClient = this.client.getQueryApi('monitoring');
    const fluxQuery = `from(bucket: "monitoringDB")
     |> range(start: -60m)
     |> filter(fn: (r) => r._measurement == "load")
     |> filter(fn: (r) => r["host"] == "device3")
     |> filter(fn: (r) => r["_field"] == "voltage" or r["_field"] == "power")
     `;

    return new Promise<any[]>((resolve, reject) => {
      const results: any[] = [];

      queryClient.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          results.push(tableObject);
        },
        error: (error) => {
          console.error('\nError', error);
          reject(error);
        },
        complete: () => {
          console.log('\nSuccess');
          resolve(results);
        },
      });
    });
  }

  async getSolarData(): Promise<any[]> {
    const queryClient = this.client.getQueryApi('monitoring');
    const fluxQuery = `from(bucket: "monitoringDB")
     |> range(start: -60m)
     |> filter(fn: (r) => r._measurement == "solar")
     |> filter(fn: (r) => r["host"] == "device1")
     |> filter(fn: (r) => r["_field"] == "voltage" or r["_field"] == "power")
     `;

    return new Promise<any[]>((resolve, reject) => {
      const results: any[] = [];

      queryClient.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          results.push(tableObject);
        },
        error: (error) => {
          console.error('\nError', error);
          reject(error);
        },
        complete: () => {
          console.log('\nSuccess');
          resolve(results);
        },
      });
    });
  }
}
