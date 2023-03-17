import { Module } from '@nestjs/common';
import { MongoDbModule } from '../../database/mongodb.module';
import { CanIChangeStatus } from './canIChangeStatus';
import { InsertTodo } from './insertTodo';

//bubbles, I dont like repeats

const providesExports = [
  InsertTodo, //this will goes to db
  CanIChangeStatus, // this will goes to an api etc.
];

@Module({
  imports: [MongoDbModule],
  providers: [...providesExports],
  exports: [...providesExports],
})
export class AddTodoModule {}
