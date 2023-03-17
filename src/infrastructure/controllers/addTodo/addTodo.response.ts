import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '../../../entities/todo';

export class AddTodoResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  isDone: boolean;

  @ApiProperty()
  createdate: Date;

  @ApiProperty()
  updateddate: Date;

  constructor(todo: Todo) {
    this.id = todo.id;
    this.content = todo.content;
    this.isDone = todo.isDone;
    this.createdate = todo.createdDate;
    this.updateddate = todo.updatedDate;
  }
}
