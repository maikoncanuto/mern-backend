import { Injectable } from '@nestjs/common';
import { ICanIChangeStatus } from 'usecases/todo/addTodo/entityGateways';

@Injectable()
export class CanIChangeStatus implements ICanIChangeStatus {
  execute(todoId: number): boolean {
    console.log(`TodoId ${todoId}`, todoId);
    return true;
  }
}
