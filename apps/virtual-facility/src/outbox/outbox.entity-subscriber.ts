import {
    DataSource,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from 'typeorm';
  import { Outbox } from './entities/outbox.entity';
  import { OutboxProcessor } from './outbox.processor';
  
  @EventSubscriber()
  export class OutboxEntitySubscriber
    implements EntitySubscriberInterface<Outbox>
  {
    constructor(
      dataSource: DataSource,
      private readonly outboxProcessor: OutboxProcessor,
    ) {
      dataSource.subscribers.push(this);
    }
  
    listenTo() {
      return Outbox;
    }
  
    async afterInsert(event: InsertEvent<Outbox>) {
      await this.outboxProcessor.dispatchWorkflowEvent(event.entity);
      await event.manager.delete(Outbox, event.entity.id);
    }
  }