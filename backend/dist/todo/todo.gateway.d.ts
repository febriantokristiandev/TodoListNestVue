import { Socket } from 'socket.io';
import { TodoService } from './todo.service';
import { UserService } from '../user/user.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
export declare class TodoGateway {
    private readonly todoService;
    private readonly userService;
    constructor(todoService: TodoService, userService: UserService);
    handleCreateTodo(createTodoDto: CreateTodoDto, client: Socket): Promise<void>;
    handleUpdateTodo(updateTodoDto: UpdateTodoDto, client: Socket): Promise<void>;
    handleDeleteTodo(deleteTodoDto: {
        id: number;
        userId: number;
    }, client: Socket): Promise<void>;
    handleMarkAsDone(markAsDoneDto: {
        id: number;
        userId: number;
    }, client: Socket): Promise<void>;
}
