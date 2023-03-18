import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControllersModule } from '../infrastructure/controllers/controllers.module';
import { LoggerModule } from '../infrastructure/logger/logger.module';
import { configuration } from './configuration';

@Module({
  imports: [
    LoggerModule,
    ControllersModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [configuration],
    }),
  ],
})
export class AppConfigModule {}
