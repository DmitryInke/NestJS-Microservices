import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class TracingService {
    generateTraceId(): string {
        return randomUUID();
      }
}
