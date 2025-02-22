import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { MySqlDriver } from '@mikro-orm/mysql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Task } from './src/entities/task.entity';

ConfigModule.forRoot(); // Load environment variables

const configService = new ConfigService();

const mikroOrmConfig: MikroOrmModuleOptions = {
  driver: MySqlDriver,
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  user: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  dbName: configService.get<string>('DB_NAME'),
  autoLoadEntities: true,
  debug: true,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  migrations: {
    path: 'src/migrations',
    glob: '!(*.d).{js,ts}', // Corrected this
    transactional: true,
    disableForeignKeys: false,
    emit: 'ts', // Ensures migrations are generated as TypeScript
  },
};

export default mikroOrmConfig;
