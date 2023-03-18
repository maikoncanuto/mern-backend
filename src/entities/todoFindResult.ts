import { Todo } from './todo';

export class TodoFindResult {
  constructor() {
    this.todos = [];
  }

  total: number = 0;
  todos: Array<Todo> = [];
}
