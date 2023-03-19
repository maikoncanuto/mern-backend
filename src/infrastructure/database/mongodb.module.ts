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
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get<string>(
          'database_user',
        )}:${configService.get<string>(
          'database_password',
        )}@${configService.get<string>(
          'database_instance',
        )}/?retryWrites=true&w=majority`,
        sslCA: `${__dirname}/certs/rds-combined-ca-bundle.pem`,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        sslValidate: false,
        ssl: configService.get<string>('NODE_ENV') !== 'local',
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [...importExports],
})
export class MongoDbModule {}
