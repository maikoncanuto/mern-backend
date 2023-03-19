import { Module } from '@nestjs/common';
import { MongoDbModule } from '../../database/mongodb.module';
import { CanIChangeStatus } from './canIChangeStatus';
import { InsertTodo } from './insertTodo';

const providesExports = [InsertTodo, CanIChangeStatus];

@Module({
  imports: [MongoDbModule],
  providers: [...providesExports],
  exports: [...providesExports],
})
export class AddTodoModule {}
