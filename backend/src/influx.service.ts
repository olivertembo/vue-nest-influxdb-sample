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

  async query<T>(query: string): Promise<T[]> {
    try {
      return new Promise<T[]>((resolve, reject) => {
        const result: T[] = [];

        const fluxResultObserver: FluxResultObserver<string[]> = {
          next(row: string[], tableMeta: FluxTableMetaData) {
            result.push(row as unknown as T);
          },
          error(error: Error) {
            console.error(error);
            console.log('\nFinished ERROR');
            reject(error);
          },
          complete() {
            console.log('\nFinished SUCCESS');
            resolve(result);
          },
        };

        this.client
          .getQueryApi('monitoring')
          .queryRows(query, fluxResultObserver);
      });
    } catch (error) {
      console.error('Error executing query:', error);
      throw new Error('Failed to execute query');
    }
  }

  async getSolarData(): Promise<any[]> {
    const queryClient = this.client.getQueryApi('monitoring');
    const fluxQuery = `from(bucket: "monitoringDB")
     |> range(start: -60m)
     |> filter(fn: (r) => r._measurement == "solar")`;

    const query = queryClient.queryRows(fluxQuery, {
      next: (row, tableMeta) => {
        const tableObject = tableMeta.toObject(row);
        console.log(tableObject);
      },
      error: (error) => {
        console.error('\nError', error);
      },
      complete: () => {
        console.log('\nSuccess');
      },
    });

    console.log(query);

    return [];
  }
}
