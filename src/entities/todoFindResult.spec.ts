import { Todo } from './todo';
import { TodoFindResult } from './todoFindResult';

describe('TodoFindResult', () => {
  let todoFindResult: TodoFindResult;

  beforeEach(() => {
    todoFindResult = new TodoFindResult();
  });

  it('should have a default total of 0', () => {
    expect(todoFindResult.total).toBe(0);
  });

  it('should have an empty todos array', () => {
    expect(todoFindResult.todos).toEqual([]);
  });

  it('should be able to add new todos', () => {
    const todo1 = new Todo();
    todo1.id = '1';
    todo1.content = 'Test todo 1';

    const todo2 = new Todo();
    todo2.id = '2';
    todo2.content = 'Test todo 2';

    todoFindResult.todos.push(todo1);
    todoFindResult.todos.push(todo2);

    expect(todoFindResult.todos.length).toBe(2);
    expect(todoFindResult.todos[0].id).toBe('1');
    expect(todoFindResult.todos[1].id).toBe('2');
  });
});
