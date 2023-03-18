import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { LoggerService } from './logger.service';


describe('LoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    loggerService = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(loggerService).toBeDefined();
  });

  describe('debug', () => {
    it('should call debug method when not in production environment', () => {
      const spy = jest.spyOn(Logger.prototype, 'debug');
      process.env.NODE_ENV = 'development';
      loggerService.debug('context', 'message');
      expect(spy).toHaveBeenCalledWith('[DEBUG] message', 'context');
    });

    it('should not call debug method when in production environment', () => {
      const spy = jest.spyOn(Logger.prototype, 'debug');
      process.env.NODE_ENV = 'production';
      loggerService.debug('context', 'message');
      expect(spy).not.toHaveBeenCalled();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });
  });

  describe('log', () => {
    it('should call log method', () => {
      const spy = jest.spyOn(Logger.prototype, 'log');
      loggerService.log('context', 'message');
      expect(spy).toHaveBeenCalledWith('[INFO] message', 'context');
    });
  });

  describe('error', () => {
    it('should call error method', () => {
      const spy = jest.spyOn(Logger.prototype, 'error');
      loggerService.error('context', 'message', 'trace');
      expect(spy).toHaveBeenCalledWith('[ERROR] message', 'trace', 'context');
    });
  });

  describe('warn', () => {
    it('should call warn method', () => {
      const spy = jest.spyOn(Logger.prototype, 'warn');
      loggerService.warn('context', 'message');
      expect(spy).toHaveBeenCalledWith('[WARN] message', 'context');
    });
  });

  describe('verbose', () => {
    it('should call verbose method when not in production environment', () => {
      const spy = jest.spyOn(Logger.prototype, 'verbose');
      process.env.NODE_ENV = 'development';
      loggerService.verbose('context', 'message');
      expect(spy).toHaveBeenCalledWith('[VERBOSE] message', 'context');
    });

    it('should not call verbose method when in production environment', () => {
      const spy = jest.spyOn(Logger.prototype, 'verbose');
      process.env.NODE_ENV = 'production';
      loggerService.verbose('context', 'message');
      expect(spy).not.toHaveBeenCalled();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });
  });
});
