import { Test } from '@nestjs/testing';
import { AddTodoRequest } from './addTodo.request';
import { validateSync } from 'class-validator';

describe('AddTodoRequest', () => {
  let request: AddTodoRequest;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AddTodoRequest],
    }).compile();

    request = moduleRef.get<AddTodoRequest>(AddTodoRequest);
  });

  describe('content', () => {
    it('should be a string', () => {
      const content = 123 as any;
      request.content = content;
      const errors = validateSync(request);
      expect(errors[0].constraints).toEqual({
        isString: 'content must be a string',
      });
    });

    it('should not be empty', () => {
      const content = '';
      request.content = content;
      const errors = validateSync(request);
      expect(errors[0].constraints).toEqual({
        isNotEmpty: 'content should not be empty',
      });
    });

    it('should be valid', () => {
      const content = 'test';
      request.content = content;
      const errors = validateSync(request);
      expect(errors).toHaveLength(0);
    });
  });
});
