import { TodoFindResult } from '../../../entities/todoFindResult';
import { Todo } from '../../../entities/todo';
import { IFindTodos } from './entityGateways';
import { getTodosUsecase } from './getTodos.usecase';

describe('Usecase - AddTodo', () => {
  let usecase: getTodosUsecase;

  it('OK', async () => {
    //arrange
    const totalReturns = 10;
    const insertedTodoId = '1';
    const findTodos: IFindTodos = {
      execute: async function (
        content: string,
        pageSize: number,
        pageNumber: number,
      ): Promise<TodoFindResult> {
        const t = new Todo();
        t.content = 'hello';

        const r = new TodoFindResult();
        r.todos.push(t);
        r.total = totalReturns;
        return r;
      },
    };

    //act
    usecase = new getTodosUsecase(findTodos);
    const result: TodoFindResult = await usecase.execute('helloo', 10, 1);

    //assert
    expect(result.total).toBe(totalReturns);
  });
});
