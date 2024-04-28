import { Module } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inbox } from './entities/inbox.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inbox])],
  providers: [InboxService],
  exports: [TypeOrmModule, InboxService],
})
export class InboxModule {}
