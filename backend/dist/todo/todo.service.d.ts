import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { User } from '../user/user.entity';
export declare class TodoService {
    private todoRepository;
    private userRepository;
    constructor(todoRepository: Repository<Todo>, userRepository: Repository<User>);
    createTodo(userId: number, title: string, description: string, priority: 'High' | 'Medium' | 'Low'): Promise<Todo>;
    getTodos(userId: number, status?: 'Pending' | 'Completed'): Promise<Todo[]>;
    getTodoById(userId: number, id: number): Promise<Todo | null>;
    updateTodo(userId: number, id: number, title: string, description: string, priority: 'High' | 'Medium' | 'Low'): Promise<Todo>;
    deleteTodo(userId: number, id: number): Promise<Todo>;
    markAsDone(userId: number, id: number): Promise<Todo>;
}
