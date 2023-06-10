import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      username: process.env.TYPEORM_USERNAME,
      database: process.env.TYPEORM_DATABASE,
      password: process.env.TYPEORM_PASSWORD,
      autoLoadEntities: true,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      migrations: ['dist/db/migrations/*.js'],
      synchronize: true,
      timezone: 'z'
    };
  },
};

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  username: process.env.TYPEORM_USERNAME,
  database: process.env.TYPEORM_DATABASE,
  password: process.env.TYPEORM_PASSWORD,
  synchronize: true,
  timezone: 'Z'
};
const dataSource = new DataSource(typeOrmConfig as DataSourceOptions)
export default dataSource