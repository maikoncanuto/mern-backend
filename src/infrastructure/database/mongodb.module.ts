import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoDatabaseModel, TodoSchema } from './schemas';

const importExports = [
  MongooseModule.forFeature([
    { name: TodoDatabaseModel.name, schema: TodoSchema },
  ]),
  ConfigModule,
];

@Module({
  imports: [
    ...importExports,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      //MongooseModule.forRoot(
      //  `mongodb://${process.env?.database_user}:${process.env?.database_password}@${process.env?.database_instance}/?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`,
      //  {
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI_CONNECTION'),
        sslCA: `${__dirname}/certs/rds-combined-ca-bundle.pem`,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        sslValidate: false,
        ssl: process.env?.NODE_ENV !== 'local',
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [...importExports],
})
export class MongoDbModule {}
