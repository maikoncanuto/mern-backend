import { Todo } from '../../../entities/Todo';
import { ICanIChangeStatus, IInsertTodo } from './entityGateways';
import { addTodoUseCases } from './addTodo.usecases';

describe("addTodoUseCases", () => {
  let insertTodoMock: jest.Mocked<IInsertTodo>;
  let canIChangeStatusMock: jest.Mocked<ICanIChangeStatus>;
  let useCase: addTodoUseCases;

  beforeEach(() => {
    insertTodoMock = {
      execute: jest.fn()
    };

    canIChangeStatusMock = {
      execute: jest.fn()
    };

    useCase = new addTodoUseCases(insertTodoMock, canIChangeStatusMock);
  });

  it("should create a new Todo", async () => {
    const content = "Test Todo";
    const todo = new Todo();
    todo.content = content;
    todo.isDone = false;

    canIChangeStatusMock.execute.mockReturnValueOnce(true);
    insertTodoMock.execute.mockResolvedValueOnce(todo);

    const result = await useCase.execute(content);

    expect(canIChangeStatusMock.execute).toHaveBeenCalledWith(1);
    expect(insertTodoMock.execute).toHaveBeenCalledWith(todo);
    expect(result).toEqual(todo);
  });

  it("should throw an error when canIChangeStatus returns false", async () => {
    const content = "Test Todo";

    canIChangeStatusMock.execute.mockReturnValueOnce(false);

    await expect(useCase.execute(content)).rejects.toThrowError("You cant change the ID");
  });
});
