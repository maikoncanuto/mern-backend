import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service';
import { LoggingInterceptor } from './logger.interceptor';
import { of } from 'rxjs';

const createMockExecutionContext = (request) => ({
  switchToHttp: () => ({
    getRequest: () => request,
  }),
});

const createMockCallHandler = () => ({
  handle: () => of({}),
});

describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;
  let loggerService: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    loggerService = module.get<LoggerService>(LoggerService);
    interceptor = new LoggingInterceptor(loggerService);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should log incoming and outgoing requests', () => {
    const request = {
      method: 'GET',
      path: '/test',
      headers: { 'x-forwarded-for': '1.2.3.4' },
      connection: { remoteAddress: '5.6.7.8' },
    };
    const context = createMockExecutionContext(request);
    const next = createMockCallHandler();

    const logSpy = jest.spyOn(loggerService, 'log');

    interceptor.intercept(context as unknown as ExecutionContext, next as unknown as CallHandler).subscribe();

    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenNthCalledWith(1, `Incoming Request on ${request.path}`, `method=${request.method} ip=1.2.3.4`);
    expect(logSpy).toHaveBeenNthCalledWith(2, `End Request for ${request.path}`, expect.stringContaining(`method=${request.method} ip=1.2.3.4 duration=`));
  });
});
