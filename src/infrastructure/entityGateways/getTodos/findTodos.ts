import { Injectable } from '@nestjs/common';
import { TodoFindResult } from '../../../entities/todoFindResult';
import { TodoBaseDatabaseAccess } from '../../database/TodoBaseDatabaseAccess';
import { IFindTodos } from '../../../usecases/todo/getTodos/entityGateways';

@Injectable()
export class FindTodos extends TodoBaseDatabaseAccess implements IFindTodos {
  async execute(
    name: string,
    pageSize: number,
    pageNumber: number,
  ): Promise<TodoFindResult> {
    name = name || '';

    console.log(new RegExp(name.trim(), 'ig'));

    const [todos, total] = await Promise.all([
      this.todoDatabaseModel
        .find({ content: new RegExp(name.trim(), 'ig') })
        .skip(pageSize * (pageNumber - 1))
        .limit(pageSize),
      this.todoDatabaseModel.countDocuments({
        content: new RegExp(name.trim(), 'ig'),
      }),
    ]);

    const result = new TodoFindResult();

    result.todos = todos.map((x) => {
      return {
        content: x.content,
        createdDate: x.createdDate,
        id: x.id.toString(),
        isDone: x.isDone,
        updatedDate: x.updatedDate,
      };
    });

    result.total = total;
    return result;
  }
}
