import { Todo } from '../todo/todo.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    darkMode: boolean;
    todos: Todo[];
}
