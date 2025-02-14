import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    createTodo(req: any, createTodoDto: CreateTodoDto): unknown;
    getTodos(req: any, status?: 'Pending' | 'Completed'): unknown;
    getTodoById(req: any, id: number): unknown;
    updateTodo(req: any, id: number, updateTodoDto: UpdateTodoDto): unknown;
    deleteTodo(req: any, id: number): unknown;
    markAsDone(req: any, id: number): unknown;
}
