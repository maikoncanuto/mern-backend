import { Module } from '@nestjs/common';
import { EntityGatewaysModule } from '../../infrastructure/entityGateways/entityGateways.module';
import { AddTodoController } from './addTodo/addTodo.controller';
import { GetOneTodoController } from './getOneTodo/getTodos.controller';
import { GetTodosController } from './getTodosController.ts/getTodos.controller';

@Module({
  imports: [EntityGatewaysModule],
  controllers: [AddTodoController, GetTodosController, GetOneTodoController],
})
export class ControllersModule {}
