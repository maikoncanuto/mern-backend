import { Todo } from '../../../entities/todo';
import { TodoFindResult } from '../../../entities/todoFindResult';
import { GetTodoResponse } from './getTodoResponse';

describe('GetTodoResponse', () => {
  describe('build', () => {
    it('should build a valid response object', () => {
      const pageSize = 10;
      const pageNumber = 1;
      const todoFindResult = new TodoFindResult();
      todoFindResult.total = 2;
      const todo1 = new Todo();
      todo1.id = '1';
      todo1.content = 'Todo 1';
      todo1.isDone = false;
      todo1.createdDate = new Date();
      todo1.updatedDate = new Date();
      const todo2 = new Todo();
      todo2.id = '2';
      todo2.content = 'Todo 2';
      todo2.isDone = true;
      todo2.createdDate = new Date();
      todo2.updatedDate = new Date();
      todoFindResult.todos = [todo1, todo2];

      const response = GetTodoResponse.build(
        pageSize,
        pageNumber,
        todoFindResult,
      );

      expect(response.pageNumber).toEqual(pageNumber);
      expect(response.pageSize).toEqual(pageSize);
      expect(response.total).toEqual(todoFindResult.total);
      expect(response.todos).toHaveLength(todoFindResult.todos.length);
      expect(response.todos[0]).toEqual({
        id: todo1.id,
        content: todo1.content,
        isDone: todo1.isDone,
        createdDate: todo1.createdDate,
        updatedDate: todo1.updatedDate,
      });
      expect(response.todos[1]).toEqual({
        id: todo2.id,
        content: todo2.content,
        isDone: todo2.isDone,
        createdDate: todo2.createdDate,
        updatedDate: todo2.updatedDate,
      });
    });
  });
});
