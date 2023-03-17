import { Injectable } from '@nestjs/common';
import { ICanIChangeStatus } from 'usecases/todo/addTodo/entityGateways';

@Injectable()
export class CanIChangeStatus implements ICanIChangeStatus {
  execute(todoId: number): boolean {
    // web api call etc.
    return true;
  }
}
