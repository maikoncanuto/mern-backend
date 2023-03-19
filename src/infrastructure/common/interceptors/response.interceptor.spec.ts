import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { ResponseInterceptor } from './response.interceptor';
import { of } from 'rxjs';

const createMockExecutionContext = (request) => ({
  switchToHttp: () => ({
    getRequest: () => request,
  }),
});

const createMockCallHandler = (data) => ({
  handle: () => of(data),
});

describe('ResponseInterceptor', () => {
  let interceptor: ResponseInterceptor<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseInterceptor],
    }).compile();

    interceptor = module.get<ResponseInterceptor<any>>(ResponseInterceptor);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should transform the response', () => {
    const request = {
      method: 'GET',
      path: '/test',
    };
    const context = createMockExecutionContext(request);
    const data = { message: 'Test data' };
    const next = createMockCallHandler(data);

    interceptor
      .intercept(
        context as unknown as ExecutionContext,
        next as unknown as CallHandler,
      )
      .subscribe((response) => {
        expect(response.data).toBe(data);
        expect(response.isArray).toBe(false);
        expect(response.path).toBe(request.path);
        expect(response.duration).toMatch(/\d+ms/);
        expect(response.method).toBe(request.method);
      });
  });

  it('should set isArray to true for array data', () => {
    const request = {
      method: 'GET',
      path: '/test',
    };
    const context = createMockExecutionContext(request);
    const data = [{ message: 'Test data' }];
    const next = createMockCallHandler(data);

    interceptor
      .intercept(
        context as unknown as ExecutionContext,
        next as unknown as CallHandler,
      )
      .subscribe((response) => {
        expect(response.isArray).toBe(true);
      });
  });
});
