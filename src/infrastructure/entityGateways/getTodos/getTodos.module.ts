import { Module } from '@nestjs/common';
import { MongoDbModule } from '../../database/mongodb.module';
import { FindTodos } from './findTodos';

const providesExports = [FindTodos];

@Module({
  imports: [MongoDbModule],
  providers: [...providesExports],
  exports: [...providesExports],
})
export class GetTodosModule {}
