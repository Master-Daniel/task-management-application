import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { MySqlDriver } from '@mikro-orm/mysql';
import { TaskModule } from './task.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRootAsync({
      useFactory: (configService: ConfigService): MikroOrmModuleOptions => ({
        driver: MySqlDriver,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        user: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        dbName: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        debug: true,
        migrations: {
          path: 'src/migrations',
          glob: '!(*.d).{js,ts}',
        },
      }),
      inject: [ConfigService],
    }),
    TaskModule,
  ],
})
export class AppModule {}
