import { Todo } from 'entities/todo';

export interface IFindOneTodo {
  execute(id: string): Promise<Todo>;
}
