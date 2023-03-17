import { addTodoUseCases } from './addTodo.usecases';
import { Todo } from '../../../entities/todo';
import { ICanIChangeStatus, IInsertTodo } from './entityGateways';

describe('Usecase - AddTodo', () => {
  let usecase: addTodoUseCases;

  it('OK', async () => {
    //arrange
    const insertedTodoId = '1';
    const insertTodo: IInsertTodo = {
      execute: async function (todo: Todo): Promise<Todo> {
        todo.id = insertedTodoId;
        return todo;
      },
    };

    const canIChangeStatus: ICanIChangeStatus = {
      execute: function (todoId: number): boolean {
        return true;
      },
    };

    //act
    usecase = new addTodoUseCases(insertTodo, canIChangeStatus);
    const result: Todo = await usecase.execute('helloo');

    //assert
    expect(result.id).toBe(insertedTodoId);
  });
});
