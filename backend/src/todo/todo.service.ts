import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { User } from '../user/user.entity'; // Assuming you have a User entity

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
        @InjectRepository(User)
        private userRepository: Repository<User>, 
    ) { }

    // Create a todo
    async createTodo(userId: number, title: string, description: string, priority: 'High' | 'Medium' | 'Low') {
        // Fetch full user entity from the database
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new Error('User not found');
        }

        const todo = new Todo();
        todo.title = title;
        todo.description = description;
        todo.priority = priority;
        todo.user = user; // Assign the full User object to todo

        return await this.todoRepository.save(todo);
    }

    // Get todos for a user with an optional status filter
    async getTodos(userId: number, status?: 'Pending' | 'Completed') {
        const query = this.todoRepository.createQueryBuilder('todo')
            .where('todo.user_Id = :userId', { userId });

        if (status) {
            query.andWhere('todo.status = :status', { status });
        }

        return await query.getMany();
    }

    // Get a todo by its ID for the logged-in user
    async getTodoById(userId: number, id: number) {
        return await this.todoRepository.findOne({
            where: { id, user: { id: userId } },
        });
    }

    // Update a todo
    async updateTodo(
        userId: number,
        id: number,
        title: string,
        description: string,
        priority: 'High' | 'Medium' | 'Low',
    ) {
        const todo = await this.todoRepository.findOne({
            where: { id, user: { id: userId } },
        });

        if (!todo) {
            throw new Error('Todo not found');
        }

        todo.title = title;
        todo.description = description;
        todo.priority = priority;

        return await this.todoRepository.save(todo);
    }

    // Delete a todo
    async deleteTodo(userId: number, id: number) {
        const todo = await this.todoRepository.findOne({
            where: { id, user: { id: userId } },
        });

        if (!todo) {
            throw new Error('Todo not found');
        }

        return await this.todoRepository.remove(todo);
    }

    // Mark a todo as done
    async markAsDone(userId: number, id: number) {
        const todo = await this.todoRepository.findOne({
            where: { id, user: { id: userId } },
        });

        if (!todo) {
            throw new Error('Todo not found');
        }

        if (todo.status === 'Completed') {
            throw new Error('Todo is already completed');
        }

        todo.status = 'Completed'; // Mark as completed
        return await this.todoRepository.save(todo);
    }
}
