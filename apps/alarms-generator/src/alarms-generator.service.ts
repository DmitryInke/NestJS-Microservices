import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, NatsRecordBuilder } from '@nestjs/microservices';
import { Interval } from '@nestjs/schedule';
import { ALARMS_SERVICE } from './constants';
import { TracingService } from '@app/tracing';
import * as nats from 'nats';

@Injectable()
export class AlarmsGeneratorService {
  constructor(
    @Inject(ALARMS_SERVICE)
    private readonly alarmsService: ClientProxy,
    private readonly tracingService: TracingService,
  ) {}

  @Interval(10000)
  generateAlarm() {
    const headers = nats.headers();
    headers.set('traceId', this.tracingService.generateTraceId());

    const alarmCreatedEvent = {
      name: 'Alarm #' + Math.floor(Math.random() * 1000) + 1,
      // random number from 1-100,
      buildingId: Math.floor(Math.random() * 100) + 1,
    };
    const natsRecord = new NatsRecordBuilder(alarmCreatedEvent)
      .setHeaders(headers)
      .build();

    this.alarmsService.emit('alarm.created', natsRecord);
  }
}
