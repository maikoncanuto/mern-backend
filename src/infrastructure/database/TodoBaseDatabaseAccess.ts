import { InjectModel } from '@nestjs/mongoose';
import { TodoDatabaseModel, TodoDocument } from './schemas';
import { Model } from 'mongoose';

export abstract class TodoBaseDatabaseAccess {
  constructor(
    @InjectModel(TodoDatabaseModel.name)
    protected todoDatabaseModel: Model<TodoDocument>,
  ) {}
}
