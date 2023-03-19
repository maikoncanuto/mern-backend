import { TodoFindResult } from 'entities/todoFindResult';
import { IFindTodos } from './entityGateways';

export class getTodosUsecase {
  constructor(private readonly findTodos: IFindTodos) {}

  async execute(
    name: string,
    pageSize: number,
    pageNumber: number,
  ): Promise<TodoFindResult> {
    return this.findTodos.execute(name, pageSize, pageNumber);
  }
}
