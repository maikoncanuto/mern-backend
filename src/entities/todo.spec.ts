import { Todo } from './Todo';

describe('Todo', () => {
  let todo: Todo;

  beforeEach(() => {
    todo = new Todo();
  });

  it('should have a default id of an empty string', () => {
    expect(todo.id).toBe('');
  });

  it('should have a default content of an empty string', () => {
    expect(todo.content).toBe('');
  });

  it('should have a default isDone of false', () => {
    expect(todo.isDone).toBe(false);
  });

  it('should have a default createdDate of undefined', () => {
    expect(todo.createdDate).toBeUndefined();
  });

  it('should have a default updatedDate of undefined', () => {
    expect(todo.updatedDate).toBeUndefined();
  });
});
