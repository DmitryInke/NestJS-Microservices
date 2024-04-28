import { Module } from '@nestjs/common';
import { WorkflowsServiceController } from './workflows-service.controller';
import { WorkflowsServiceService } from './workflows-service.service';
import { WorkflowsModule } from './workflows/workflows.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module';
import { InboxModule } from './inbox/inbox.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    WorkflowsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    HealthModule,
    InboxModule,
  ],
  controllers: [WorkflowsServiceController],
  providers: [WorkflowsServiceService],
})
export class WorkflowsServiceModule {}
