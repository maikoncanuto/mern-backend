import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppConfigModule } from 'config/config.module';
import { AllExceptionFilter } from './infrastructure/common/filter/exception.filter';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { LoggerModule } from './infrastructure/logger/logger.module';

@Module({
  imports: [LoggerModule, ControllersModule, AppConfigModule],

  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
