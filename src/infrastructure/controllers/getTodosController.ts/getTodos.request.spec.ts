import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { GetTodosRequest } from './getTodos.request';

describe('GetTodosRequest', () => {
  it('should validate a valid request', async () => {
    const request = plainToClass(GetTodosRequest, {
      content: 'Test content',
      pageSize: 10,
      pageNumber: 1,
    });

    const errors = await validate(request);
    expect(errors).toHaveLength(0);
  });

  it('should validate a request with invalid content', async () => {
    const request = plainToClass(GetTodosRequest, {
      content: 123, // Invalid type
      pageSize: 10,
      pageNumber: 1,
    });

    const errors = await validate(request);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('content');
  });

  it('should validate a request with invalid pageSize', async () => {
    const request = plainToClass(GetTodosRequest, {
      content: 'Test content',
      pageSize: 'invalid', // Invalid type
      pageNumber: 1,
    });

    const errors = await validate(request);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('pageSize');
  });

  it('should validate a request with invalid pageNumber', async () => {
    const request = plainToClass(GetTodosRequest, {
      content: 'Test content',
      pageSize: 10,
      pageNumber: 'invalid', // Invalid type
    });

    const errors = await validate(request);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('pageNumber');
  });
});
