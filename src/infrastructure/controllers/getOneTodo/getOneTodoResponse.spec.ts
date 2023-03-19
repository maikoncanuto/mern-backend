import { Todo } from '../../../entities/todo';
import { GetOneTodoResponse } from './getOneTodoResponse';

describe('GetOneTodoResponse', () => {
  describe('build', () => {
    it('should create a valid response object', () => {
      const todo = new Todo();
      todo.id = '1';
      todo.content = 'test';
      todo.isDone = false;
      todo.createdDate = new Date('2022-03-17T18:37:39.120Z');
      todo.updatedDate = new Date('2022-03-17T18:37:39.120Z');

      const response = GetOneTodoResponse.build(todo);

      expect(response).toBeDefined();
      expect(response.id).toEqual(todo.id);
      expect(response.content).toEqual(todo.content);
      expect(response.isDone).toEqual(todo.isDone);
      expect(response.createdDate).toEqual(todo.createdDate);
      expect(response.updatedDate).toEqual(todo.updatedDate);
    });
  });
});
