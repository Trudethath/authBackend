import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'auth_app',
      entities: [User],
      synchronize: true, //disable in production
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
