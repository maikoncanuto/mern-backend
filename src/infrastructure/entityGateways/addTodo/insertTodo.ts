import { Injectable } from '@nestjs/common';
import { TodoBaseDatabaseAccess } from '../../database/TodoBaseDatabaseAccess';
import { IInsertTodo } from 'usecases/todo/addTodo/entityGateways';
import { Todo } from '../../../entities/todo';
@Injectable()
export class InsertTodo extends TodoBaseDatabaseAccess implements IInsertTodo {
  async execute(todo: Todo): Promise<Todo> {
    const dbModel = new this.todoDatabaseModel(todo);
    const result = await dbModel.save();
    todo.id = result._id.toString();
    return todo;
  }
}
