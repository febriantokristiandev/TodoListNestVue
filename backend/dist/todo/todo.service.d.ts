import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { User } from '../user/user.entity';
export declare class TodoService {
    private todoRepository;
    private userRepository;
    constructor(todoRepository: Repository<Todo>, userRepository: Repository<User>);
    createTodo(userId: number, title: string, description: string, priority: 'High' | 'Medium' | 'Low'): unknown;
    getTodos(userId: number, status?: 'Pending' | 'Completed'): unknown;
    getTodoById(userId: number, id: number): unknown;
    updateTodo(userId: number, id: number, title: string, description: string, priority: 'High' | 'Medium' | 'Low'): unknown;
    deleteTodo(userId: number, id: number): unknown;
    markAsDone(userId: number, id: number): unknown;
}
