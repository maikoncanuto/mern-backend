import { Todo } from '../../../entities/todo';
import { ICanIChangeStatus, IInsertTodo } from './entityGateways';

export class addTodoUseCases {
  constructor(
    private readonly insertTodo: IInsertTodo,
    private readonly canIChangeStatus: ICanIChangeStatus,
  ) {}

  async execute(content: string): Promise<Todo> {
    const todo = new Todo();
    todo.content = content;
    todo.isDone = false;
    if (!this.canIChangeStatus.execute(1)) {
      throw Error('You cant change the ID');
    }
    const result = await this.insertTodo.execute(todo);
    return result;
  }
}
