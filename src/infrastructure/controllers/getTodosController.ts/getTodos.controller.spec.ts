import { Test, TestingModule } from '@nestjs/testing';
import { FindTodos } from '../../entityGateways/getTodos/findTodos';
import { TodoFindResult } from 'entities/todoFindResult';
import { getTodosUsecase } from '../../../usecases/todo/getTodos/getTodos.usecase';
import { GetTodosController } from './getTodos.controller';
import { GetTodosRequest } from './getTodos.request';

const mockTodoFindResult: TodoFindResult = {
  todos: [
    {
      id: '1',
      content: 'Todo 1',
      isDone: false,
      createdDate: new Date('2022-03-17T12:00:00Z'),
      updatedDate: new Date('2022-03-17T12:00:00Z'),
    },
    {
      id: '2',
      content: 'Todo 2',
      isDone: true,
      createdDate: new Date('2022-03-17T12:00:00Z'),
      updatedDate: new Date('2022-03-17T12:00:00Z'),
    },
  ],
  total: 2,
};

describe('GetTodosController', () => {
  let controller: GetTodosController;
  let findTodos: FindTodos;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetTodosController],
      providers: [
        {
          provide: FindTodos,
          useValue: {
            execute: jest.fn().mockResolvedValue(mockTodoFindResult),
          },
        },
      ],
    }).compile();

    controller = module.get<GetTodosController>(GetTodosController);
    findTodos = module.get<FindTodos>(FindTodos);
  });

  describe('addTodo', () => {
    it('should return GetTodoResponse with valid properties', async () => {
      const request = new GetTodosRequest();
      request.content = 'Todo';
      request.pageSize = 10;
      request.pageNumber = 1;

      const response = await controller.addTodo(request);

      expect(response.pageNumber).toBe(request.pageNumber);
      expect(response.pageSize).toBe(request.pageSize);
      expect(response.total).toBe(mockTodoFindResult.total);
      expect(response.todos.length).toBe(mockTodoFindResult.todos.length);
      expect(response.todos[0].id).toBe(mockTodoFindResult.todos[0].id);
      expect(response.todos[0].content).toBe(
        mockTodoFindResult.todos[0].content,
      );
      expect(response.todos[0].isDone).toBe(mockTodoFindResult.todos[0].isDone);
      expect(response.todos[0].createdDate).toBe(
        mockTodoFindResult.todos[0].createdDate,
      );
      expect(response.todos[0].updatedDate).toBe(
        mockTodoFindResult.todos[0].updatedDate,
      );
      expect(response.todos[1].id).toBe(mockTodoFindResult.todos[1].id);
      expect(response.todos[1].content).toBe(
        mockTodoFindResult.todos[1].content,
      );
      expect(response.todos[1].isDone).toBe(mockTodoFindResult.todos[1].isDone);
      expect(response.todos[1].createdDate).toBe(
        mockTodoFindResult.todos[1].createdDate,
      );
      expect(response.todos[1].updatedDate).toBe(
        mockTodoFindResult.todos[1].updatedDate,
      );
    });
  });
});
