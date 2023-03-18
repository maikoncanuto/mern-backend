import { Todo } from '../../../entities/todo';
import { IFindOneTodo } from './entityGateways';
import { getOneTodoUsecase } from './getTodos.usecase';
import { TodoNotFoundError } from './todoNotFoundError';

describe('getOneTodoUsecase', () => {
  let findOneTodoMock: jest.Mocked<IFindOneTodo>;
  let useCase: getOneTodoUsecase;

  beforeEach(() => {
    findOneTodoMock = {
      execute: jest.fn(),
    };

    useCase = new getOneTodoUsecase(findOneTodoMock);
  });

  it('should find a Todo by ID', async () => {
    const id = '1';
    const todo = new Todo();
    todo.id = '1';
    todo.content = 'Test Todo';
    todo.isDone = false;

    findOneTodoMock.execute.mockResolvedValueOnce(todo);

    const result = await useCase.execute(id);

    expect(findOneTodoMock.execute).toHaveBeenCalledWith(id);
    expect(result).toEqual(todo);
  });

  it('should throw an error when the Todo is not found', async () => {
    const id = '1';

    findOneTodoMock.execute.mockResolvedValueOnce(null);

    await expect(useCase.execute(id)).rejects.toThrowError(TodoNotFoundError);
  });
});
