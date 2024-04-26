import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowsServiceController } from './workflows-service.controller';
import { WorkflowsServiceService } from './workflows-service.service';

describe('WorkflowsServiceController', () => {
  let workflowsServiceController: WorkflowsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WorkflowsServiceController],
      providers: [WorkflowsServiceService],
    }).compile();

    workflowsServiceController = app.get<WorkflowsServiceController>(WorkflowsServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(workflowsServiceController.getHello()).toBe('Hello World!');
    });
  });
});
