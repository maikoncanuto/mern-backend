import { TodoFindResult } from 'entities/todoFindResult';

export interface IFindTodos {
  execute(
    name: string,
    pageSize: number,
    pageNumber: number,
  ): Promise<TodoFindResult>;
}
