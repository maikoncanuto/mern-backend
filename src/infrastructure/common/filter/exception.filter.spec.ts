import { Test, TestingModule } from '@nestjs/testing';
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { AllExceptionFilter } from './exception.filter';
import { LoggerService } from '../../logger/logger.service';

const createMockArgumentsHost = (request, response) => ({
  switchToHttp: () => ({
    getRequest: () => request,
    getResponse: () => response,
  }),
});

describe('AllExceptionFilter', () => {
  let allExceptionFilter: AllExceptionFilter;
  let loggerService: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    loggerService = module.get<LoggerService>(LoggerService);
    allExceptionFilter = new AllExceptionFilter(loggerService);
  });

  it('should be defined', () => {
    expect(allExceptionFilter).toBeDefined();
  });

  it('should catch an HttpException', () => {
    const request = { url: '/test', method: 'GET' };
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const host = createMockArgumentsHost(request, response);
    const exception = new HttpException(
      'Test exception',
      HttpStatus.BAD_REQUEST,
    );

    allExceptionFilter.catch(exception, host as unknown as ArgumentsHost);

    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(response.json).toHaveBeenCalled();
  });

  it('should catch a non-HttpException', () => {
    const request = { url: '/test', method: 'GET' };
    const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const host = createMockArgumentsHost(request, response);
    const exception = new Error('Test exception');

    jest.spyOn(loggerService, 'error').mockImplementation(() => null);

    allExceptionFilter.catch(exception, host as unknown as ArgumentsHost);

    expect(response.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(response.json).toHaveBeenCalled();
  });
});
