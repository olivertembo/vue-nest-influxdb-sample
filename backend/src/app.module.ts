import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';
import { AllModule } from './modules';
import { InfluxModule } from '../src/influx.module';
import { InfluxController } from './influx.controller';

@Module({
  imports: [
    AuthModule,
    AllModule,
    TypeOrmModule.forRoot(ormConfig),
    InfluxModule,
  ],
  controllers: [AppController, InfluxController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
