import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TodoDatabaseModel } from '../../database/schemas';
import { FindOneTodo } from '../../entityGateways/getOneTodo/findOneTodo';
import { TodoNotFoundError } from '../../../usecases/todo/getOneTodo/todoNotFoundError';
import { GetOneTodoController } from './getTodos.controller';

describe('GetOneTodoController', () => {
  let controller: GetOneTodoController;
  let findOneTodo: FindOneTodo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetOneTodoController],
      providers: [
        {
          provide: FindOneTodo,
          useValue: {
            execute: jest.fn(),
            todoDatabaseModel: {} as Model<TodoDatabaseModel>,
          },
        },
      ],
    }).compile();

    controller = module.get<GetOneTodoController>(GetOneTodoController);
    findOneTodo = module.get<FindOneTodo>(FindOneTodo);
  });

  describe('addTodo', () => {
    it('should return a valid response when todo is found', async () => {
      const todo = {
        id: '1',
        content: 'test',
        isDone: false,
        createdDate: new Date('2022-03-17T18:37:39.120Z'),
        updatedDate: new Date('2022-03-17T18:37:39.120Z'),
      };
      findOneTodo.execute = jest.fn().mockResolvedValue(todo);

      const response = await controller.addTodo('1');

      expect(response).toBeDefined();
      expect(response.id).toEqual(todo.id);
      expect(response.content).toEqual(todo.content);
      expect(response.isDone).toEqual(todo.isDone);
      expect(response.createdDate).toEqual(todo.createdDate);
      expect(response.updatedDate).toEqual(todo.updatedDate);
    });

    it('should throw NotFoundException when todo is not found', async () => {
      findOneTodo.execute = jest
        .fn()
        .mockRejectedValue(new TodoNotFoundError());

      await expect(controller.addTodo('1')).rejects.toThrow(NotFoundException);
    });

    it('should rethrow error when it is not a TodoNotFoundError', async () => {
      const error = new Error('test error');
      findOneTodo.execute = jest.fn().mockRejectedValue(error);

      await expect(controller.addTodo('1')).rejects.toThrow(error);
    });
  });
});
