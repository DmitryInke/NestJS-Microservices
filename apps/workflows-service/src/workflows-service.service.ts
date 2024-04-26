import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkflowsServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
