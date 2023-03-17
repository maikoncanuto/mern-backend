import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoDatabaseModel, TodoSchema } from './schemas';

const importExports = [
  MongooseModule.forFeature([
    { name: TodoDatabaseModel.name, schema: TodoSchema },
  ]),
];

@Module({
  imports: [
    ...importExports,
    // MongooseModule.forRoot(`mongodb+srv://gabinete-app:tqYvQVvBR3okmttT@aws-us-east-1-prd-gabin.gb75s.mongodb.net/?retryWrites=true&w=majority`, {
    MongooseModule.forRoot(
      `mongodb://${process.env?.database_user}:${process.env?.database_password}@${process.env?.database_instance}/?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`,
      {
        sslCA: `${__dirname}/certs/rds-combined-ca-bundle.pem`,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        sslValidate: false,
        ssl: true,
      },
    ),
  ],
  exports: [...importExports],
})
export class MongoDbModule {}
