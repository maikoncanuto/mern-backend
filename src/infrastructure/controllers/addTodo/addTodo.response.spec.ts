import { AddTodoResponse } from './addTodo.response';

describe('AddTodoResponse', () => {
  it('should create a valid AddTodoResponse', () => {
    const todoData = {
      id: '1',
      content: 'Test content',
      isDone: false,
      createdDate: new Date('2023-01-01T00:00:00Z'),
      updatedDate: new Date('2023-01-02T00:00:00Z'),
    };

    const addTodoResponse = new AddTodoResponse(todoData);

    expect(addTodoResponse.id).toBe(todoData.id);
    expect(addTodoResponse.content).toBe(todoData.content);
    expect(addTodoResponse.isDone).toBe(todoData.isDone);
    expect(addTodoResponse.createdate).toEqual(todoData.createdDate);
    expect(addTodoResponse.updateddate).toEqual(todoData.updatedDate);
  });
});
