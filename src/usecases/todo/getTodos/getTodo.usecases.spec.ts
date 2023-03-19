import { TodoFindResult } from '../../../entities/todoFindResult';
import { IFindTodos } from './entityGateways';
import { getTodosUsecase } from './getTodos.usecase';

describe('getTodosUsecase', () => {
  let findTodosMock: jest.Mocked<IFindTodos>;
  let useCase: getTodosUsecase;

  beforeEach(() => {
    findTodosMock = {
      execute: jest.fn(),
    };

    useCase = new getTodosUsecase(findTodosMock);
  });

  it('should find Todos', async () => {
    const name = 'Test Todo';
    const pageSize = 10;
    const pageNumber = 1;

    const itens = [
      {
        id: '1',
        content: 'Test Todo 1',
        isDone: false,
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: '2',
        content: 'Test Todo 2',
        isDone: true,
        createdDate: new Date(),
        updatedDate: new Date(),
      },
    ];

    const todoFindResult: TodoFindResult = {
      total: itens.length,
      todos: itens,
    };

    findTodosMock.execute.mockResolvedValueOnce(todoFindResult);

    const result = await useCase.execute(name, pageSize, pageNumber);

    expect(findTodosMock.execute).toHaveBeenCalledWith(
      name,
      pageSize,
      pageNumber,
    );
    expect(result).toEqual(todoFindResult);
  });
});
