import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, Request, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';

@Controller('todo')
@UseGuards(JwtAuthGuard)
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async createTodo(@Request() req, @Body() createTodoDto: CreateTodoDto) {
        const userId = req.user.id;
        const { title, description, priority } = createTodoDto;

        if (!title || !description || !priority) {
            throw new Error('Missing required fields: title, description, or priority');
        }

        return this.todoService.createTodo(userId, title, description, priority);
    }

    @Get()
    getTodos(@Request() req, @Query('status') status?: 'Pending' | 'Completed') {
        const userId = req.user.id; // Extract user id from the request's user object
        return this.todoService.getTodos(userId, status);
    }

    @Get(':id')
    getTodoById(@Request() req, @Param('id') id: number) {
        const userId = req.user.id; // Extract user id from the request's user object
        return this.todoService.getTodoById(userId, id);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async updateTodo(@Request() req, @Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
        const userId = req.user.id;
        const { title, description, priority } = updateTodoDto;

        if (title === undefined || description === undefined || priority === undefined) {
            throw new Error('Missing required fields: title, description, or priority');
        }

        return this.todoService.updateTodo(userId, id, title, description, priority);
    }


    @Delete(':id')
    deleteTodo(@Request() req, @Param('id') id: number) {
        const userId = req.user.id; // Extract user id from the request's user object
        return this.todoService.deleteTodo(userId, id);
    }

    @Patch(':id/done')
    markAsDone(@Request() req, @Param('id') id: number) {
        const userId = req.user.id; // Extract user id from the request's user object
        return this.todoService.markAsDone(userId, id);
    }
}
