import { TodoFindResult } from 'entities/todoFindResult';

class Todo {
  id: string;
  content: string;
  isDone: boolean;
  createdDate: Date;
  updatedDate: Date;
}

export class GetTodoResponse {
  pageNumber: number;
  pageSize: number;
  total: number;
  todos: Array<Todo>;

  constructor() {}

  static build(
    pageSize: number,
    pageNumber: number,
    todoFindResult: TodoFindResult,
  ) {
    const response = new GetTodoResponse();
    response.pageNumber = pageNumber;
    response.pageSize = pageSize;
    response.total = todoFindResult.total;

    response.todos = todoFindResult.todos.map((x) => {
      return {
        content: x.content,
        createdDate: x.createdDate,
        isDone: x.isDone,
        updatedDate: x.updatedDate,
        id: x.id,
      };
    });

    return response;
  }
}
