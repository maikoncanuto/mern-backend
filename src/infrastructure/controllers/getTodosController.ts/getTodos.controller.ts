import { Controller, Get, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { GetTodoResponse as GetTodosResponse } from './getTodoResponse';
import { FindTodos } from '../../entityGateways/getTodos/findTodos';
import { getTodosUsecase } from '../../../usecases/todo/getTodos/getTodos.usecase';
import { GetTodosRequest } from './getTodos.request';
import { TodoFindResult } from 'entities/todoFindResult';

@Controller('todo')
@ApiTags('todo')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(GetTodosResponse)
export class GetTodosController {
  constructor(private readonly findTodos: FindTodos) {}

  @Get('')
  @ApiResponseType(GetTodosResponse, true)
  async addTodo(@Query() request: GetTodosRequest) {
    const todos: TodoFindResult = await new getTodosUsecase(
      this.findTodos,
    ).execute(request.content, request.pageSize, request.pageNumber);
    return GetTodosResponse.build(request.pageSize, request.pageNumber, todos);
  }
}
