import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateTodoDto } from './updateTodo.request';

describe('UpdateTodoDto', () => {
  it('should validate a valid UpdateTodoDto', async () => {
    const updateTodoDto = plainToClass(UpdateTodoDto, {
      id: 1,
      isDone: true,
    });

    const validationErrors = await validate(updateTodoDto);
    expect(validationErrors).toHaveLength(0);
  });

  it('should return validation errors when id is not a number', async () => {
    const updateTodoDto = plainToClass(UpdateTodoDto, {
      id: 'not-a-number',
      isDone: true,
    });

    const validationErrors = await validate(updateTodoDto);
    expect(validationErrors).toHaveLength(1);
  });

  it('should return validation errors when isDone is not a boolean', async () => {
    const updateTodoDto = plainToClass(UpdateTodoDto, {
      id: 1,
      isDone: 'not-a-boolean',
    });

    const validationErrors = await validate(updateTodoDto);
    expect(validationErrors).toHaveLength(1);
  });

  it('should return validation errors when id is missing', async () => {
    const updateTodoDto = plainToClass(UpdateTodoDto, {
      isDone: true,
    });

    const validationErrors = await validate(updateTodoDto);
    expect(validationErrors).toHaveLength(0);
  });

  it('should return validation errors when isDone is missing', async () => {
    const updateTodoDto = plainToClass(UpdateTodoDto, {
      id: 1,
    });

    const validationErrors = await validate(updateTodoDto);
    expect(validationErrors).toHaveLength(0);
  });
});
