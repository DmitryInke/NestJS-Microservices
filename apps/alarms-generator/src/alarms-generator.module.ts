import { Module } from '@nestjs/common';
import { AlarmsGeneratorService } from './alarms-generator.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ALARMS_SERVICE } from './constants';
import { TracingModule } from '@app/tracing';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: ALARMS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: process.env.NATS_URL,
        },
      },
    ]),
    TracingModule,
  ],
  controllers: [],
  providers: [AlarmsGeneratorService],
})
export class AlarmsGeneratorModule {}
