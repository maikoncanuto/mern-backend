import { Todo } from './todo';

export class TodoFindResult {
  constructor() {
    this.todos = [];
  }

  total: number;
  todos: Array<Todo>;
}
