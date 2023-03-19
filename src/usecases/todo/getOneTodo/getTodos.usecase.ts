import { Todo } from '../../../entities/todo';
import { IFindOneTodo } from './entityGateways';
import { TodoNotFoundError } from './todoNotFoundError';

export class getOneTodoUsecase {
  constructor(private readonly findOneTodo: IFindOneTodo) {}

  async execute(id: string): Promise<Todo> {
    const todo = await this.findOneTodo.execute(id);
    if (!todo) {
      throw new TodoNotFoundError();
    }
    return todo;
  }
}
