import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TodoDocument = TodoDatabaseModel & Document;

@Schema()
export class TodoDatabaseModel {
  @Prop()
  content: string;

  @Prop()
  isDone: boolean;

  @Prop()
  createdDate: Date;

  @Prop()
  updatedDate: Date;
}

export const TodoSchema = SchemaFactory.createForClass(TodoDatabaseModel);
