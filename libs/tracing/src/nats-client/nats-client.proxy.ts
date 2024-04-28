import { Injectable, Scope, Inject } from '@nestjs/common';
import {
  ClientProxy,
  CONTEXT,
  RequestContext,
  NatsContext,
  NatsRecord,
  NatsRecordBuilder,
} from '@nestjs/microservices';
import * as nats from 'nats';
import { Observable } from 'rxjs';
import { NATS_BROKER } from './constants';

@Injectable({ scope: Scope.REQUEST })
export class NatsClientProxy {
  constructor(
    @Inject(NATS_BROKER) private readonly client: ClientProxy,
    @Inject(CONTEXT) private readonly ctx: RequestContext<unknown, NatsContext>,
  ) {}

  send<TResult = any, TInput = any>(
    pattern: any,
    data: TInput,
  ): Observable<TResult> {
    return this.client.send(pattern, this.setTraceId(data));
  }

  emit<TResult = any, TInput = any>(
    pattern: any,
    data: TInput,
  ): Observable<TResult> {
    return this.client.emit(pattern, this.setTraceId(data));
  }

  private setTraceId(dataOrRecord: any) {
    const headers = dataOrRecord?.headers ?? nats.headers();
    headers.set('traceId', this.ctx.getContext().getHeaders().get('traceId'));

    if (dataOrRecord instanceof NatsRecord) {
      return new NatsRecordBuilder(dataOrRecord.data)
        .setHeaders(headers)
        .build();
    }
    return new NatsRecordBuilder()
      .setData(dataOrRecord)
      .setHeaders(headers)
      .build();
  }
}
