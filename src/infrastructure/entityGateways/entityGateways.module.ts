import { Module } from '@nestjs/common';
import { AddTodoModule } from './addTodo/addTodo.module';
import { GetOneTodoModule } from './getOneTodo/getTodos.module';
import { GetTodosModule } from './getTodos/getTodos.module';

const importExports = [AddTodoModule, GetTodosModule, GetOneTodoModule];

@Module({
  imports: [...importExports],
  providers: [],
  exports: [...importExports],
})
export class EntityGatewaysModule {}
