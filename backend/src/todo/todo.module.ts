import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { TodoGateway } from './todo.gateway';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), UserModule], 
  providers: [TodoService, TodoGateway],
  controllers: [TodoController],
})
export class TodoModule { }
