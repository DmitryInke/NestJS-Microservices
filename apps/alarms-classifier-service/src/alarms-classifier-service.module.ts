import { Module } from '@nestjs/common';
import { AlarmsClassifierServiceController } from './alarms-classifier-service.controller';
import { AlarmsClassifierServiceService } from './alarms-classifier-service.service';
import { TracingModule } from '@app/tracing';

@Module({
  imports: [TracingModule],
  controllers: [AlarmsClassifierServiceController],
  providers: [AlarmsClassifierServiceService],
})
export class AlarmsClassifierServiceModule {}
