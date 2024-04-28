import { Module } from '@nestjs/common';
import { AlarmsServiceController } from './alarms-service.controller';
import { AlarmsServiceService } from './alarms-service.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_MESSAGE_BROKER, NOTIFICATIONS_SERVICE } from './constants';
import { TracingModule } from '@app/tracing';
import { NatsClientModule } from '@app/tracing/nats-client/nats-client.module';

@Module({
  imports: [
    NatsClientModule,
    ClientsModule.register([
      {
        name: NOTIFICATIONS_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'notifications-service',
        },
      },
    ]),
    TracingModule, // 👈
  ],
  controllers: [AlarmsServiceController],
  providers: [AlarmsServiceService],
})
export class AlarmsServiceModule {}