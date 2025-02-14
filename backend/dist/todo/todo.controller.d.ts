import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    createTodo(req: any, createTodoDto: CreateTodoDto): Promise<import("./todo.entity").Todo>;
    getTodos(req: any, status?: 'Pending' | 'Completed'): Promise<import("./todo.entity").Todo[]>;
    getTodoById(req: any, id: number): Promise<import("./todo.entity").Todo | null>;
    updateTodo(req: any, id: number, updateTodoDto: UpdateTodoDto): Promise<import("./todo.entity").Todo>;
    deleteTodo(req: any, id: number): Promise<import("./todo.entity").Todo>;
    markAsDone(req: any, id: number): Promise<import("./todo.entity").Todo>;
}
