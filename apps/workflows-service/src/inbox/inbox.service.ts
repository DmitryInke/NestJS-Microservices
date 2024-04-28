import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { Inbox } from './entities/inbox.entity';

@Injectable()
export class InboxService {
  constructor(private readonly dataSource: DataSource) {}

  async processInboxMessages(
    process: (messages: Inbox[], manager: EntityManager) => Promise<unknown>,
    options: { take: number },
  ) {
    return this.dataSource.transaction(async (manager) => {
      const inboxRepository = manager.getRepository(Inbox);
      const messages = await inboxRepository.find({
        where: {
          status: 'pending',
        },
        order: {
          createdAt: 'ASC',
        },
        take: options.take,
        // While this approach works, it's far from ideal as we'll have 2 nodes running cron jobs that basically do nothing but fail.
        // This is why we should rather use one of the other approaches mentioned in this lesson instead.
        lock: {
          mode: 'pessimistic_write',
          onLocked: 'nowait',
        },
      });
      await process(messages, manager);
    });
  }
}
