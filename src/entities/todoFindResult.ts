import { Todo } from './todo';

export class TodoFindResult {
  constructor() {
    this.todos = [];
  }

  total = 0;
  todos: Array<Todo> = [];
}
