import { Todo } from 'entities/todo';

export interface IInsertTodo {
  execute(todo: Todo): Promise<Todo>;
}

export interface ICanIChangeStatus {
  execute(todoId: number): boolean;
}
