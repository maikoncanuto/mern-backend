import { Module } from '@nestjs/common';
import { MongoDbModule } from '../../database/mongodb.module';
import { FindOneTodo } from './findOneTodo';

//bubbles, I dont like repeats

const providesExports = [
  FindOneTodo,
  // this will goes to an api etc.
];

@Module({
  imports: [MongoDbModule],
  providers: [...providesExports],
  exports: [...providesExports],
})
export class GetOneTodoModule {}
