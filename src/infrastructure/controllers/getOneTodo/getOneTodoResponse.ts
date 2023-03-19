import { Todo } from '../../../entities/todo';

export class GetOneTodoResponse {
  id: string;
  content: string;
  isDone: boolean;
  createdDate: Date;
  updatedDate: Date;

  static build(todo: Todo) {
    const response = new GetOneTodoResponse();
    response.id = todo.id;
    response.content = todo.content;
    response.isDone = todo.isDone;
    response.createdDate = todo.createdDate;
    response.updatedDate = todo.updatedDate;
    return response;
  }
}
