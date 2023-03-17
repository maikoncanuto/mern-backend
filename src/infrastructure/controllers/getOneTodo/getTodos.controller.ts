import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { FindOneTodo } from '../../../infrastructure/entityGateways/getOneTodo/findOneTodo';
import { getOneTodoUsecase } from '../../../usecases/todo/getOneTodo/getTodos.usecase';
import { GetOneTodoResponse } from './getOneTodoResponse';
import { TodoNotFoundError } from '../../../usecases/todo/getOneTodo/todoNotFoundError';

@Controller('todo')
@ApiTags('todo')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(GetOneTodoResponse)
export class GetOneTodoController {
  constructor(private readonly findOneTodo: FindOneTodo) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description:
      'either an integer for the project id or a string for the project name',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  @ApiResponseType(GetOneTodoResponse, true)
  async addTodo(@Param('id') id) {
    try {
      const todo = await new getOneTodoUsecase(this.findOneTodo).execute(id);
      return GetOneTodoResponse.build(todo);
    } catch (e) {
      if (e instanceof TodoNotFoundError) {
        throw new NotFoundException(e);
      } else {
        throw e;
      }
    }
  }
}
