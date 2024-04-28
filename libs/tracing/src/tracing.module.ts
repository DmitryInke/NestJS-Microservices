import { Module } from '@nestjs/common';
import { TracingService } from './tracing.service';
import { TracingLogger } from './tracing.logger';
import { NatsClientModule } from './nats-client/nats-client.module';

@Module({
  providers: [TracingService, TracingLogger],
  exports: [TracingService, TracingLogger],
  imports: [NatsClientModule],
})
export class TracingModule {}
