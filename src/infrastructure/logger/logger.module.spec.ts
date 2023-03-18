import { Test, TestingModule } from '@nestjs/testing';
import { LoggerModule } from './logger.module';
import { LoggerService } from './logger.service';

describe('LoggerModule', () => {
  let loggerModule: TestingModule;

  beforeEach(async () => {
    loggerModule = await Test.createTestingModule({
      imports: [LoggerModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(loggerModule).toBeDefined();
  });

  it('should provide LoggerService', () => {
    const loggerService = loggerModule.get<LoggerService>(LoggerService);
    expect(loggerService).toBeDefined();
  });
});
