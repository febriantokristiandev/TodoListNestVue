import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { TodoService } from './todo.service';
import { UserService } from '../user/user.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class TodoGateway {
    constructor(
        private readonly todoService: TodoService,
        private readonly userService: UserService,
    ) { }

    @SubscribeMessage('createTodo')
    async handleCreateTodo(
        @MessageBody() createTodoDto: CreateTodoDto,
        @ConnectedSocket() client: Socket,
    ) {

        const userId = createTodoDto['userId'];

        if (!userId) {
            client.emit('error', 'User not authenticated');
            return;
        }

        const user = await this.userService.getProfile(userId);
        if (!user) {
            client.emit('error', 'User not found');
            return;
        }

        // Pastikan description memiliki nilai default
        const description = createTodoDto.description || '';
        const priority = createTodoDto.priority || 'Medium';

        const newTodo = await this.todoService.createTodo(
            userId,
            createTodoDto.title,
            description,
            priority,
        );

        client.emit('todoCreated', newTodo);
        client.broadcast.emit('todoCreated', newTodo);
    }


    @SubscribeMessage('updateTodo')
    async handleUpdateTodo(
        @MessageBody() updateTodoDto: UpdateTodoDto,
        @ConnectedSocket() client: Socket,
    ) {
        const userId = updateTodoDto['userId'];

        if (!userId) {
            client.emit('error', 'User not authenticated');
            return;
        }
        const userIdNumber = parseInt(userId, 10);
        if (isNaN(userIdNumber)) {
            client.emit('error', 'Invalid user ID');
            return;
        }

        const user = await this.userService.getProfile(userIdNumber);
        if (!user) {
            client.emit('error', 'User not found');
            return;
        }

        if (!updateTodoDto.id) {
            client.emit('error', 'Todo ID is required');
            return;
        }

        const updatedTodo = await this.todoService.updateTodo(
            userId,
            updateTodoDto.id, // id must be a valid number here
            updateTodoDto.title ?? '',
            updateTodoDto.description ?? '',
            updateTodoDto.priority ?? 'Medium',
        );
        client.emit('todoUpdated', updatedTodo);
        client.broadcast.emit('todoUpdated', updatedTodo);
    }


    @SubscribeMessage('deleteTodo')
    async handleDeleteTodo(
        @MessageBody() deleteTodoDto: { id: number, userId: number },
        @ConnectedSocket() client: Socket,
    ) {
        const { id, userId } = deleteTodoDto;

        if (!userId) {
            client.emit('error', 'User not authenticated');
            return;
        }

        const user = await this.userService.getProfile(userId);
        if (!user) {
            client.emit('error', 'User not found');
            return;
        }

        const deletedTodo = await this.todoService.deleteTodo(user.id, id);

        if (!deletedTodo) {
            client.emit('error', 'Todo not found or cannot be deleted');
            return;
        }


        // Send data back to client and broadcast
        client.emit('todoDeleted', { id, userId });
        client.broadcast.emit('todoDeleted', { id, userId });
    }

    @SubscribeMessage('markAsDone')
    async handleMarkAsDone(
        @MessageBody() markAsDoneDto: { id: number, userId: number },
        @ConnectedSocket() client: Socket,
    ) {
        const { id, userId } = markAsDoneDto;

        if (!userId) {
            client.emit('error', 'User not authenticated');
            return;
        }

        const user = await this.userService.getProfile(userId);
        if (!user) {
            client.emit('error', 'User not found');
            return;
        }

        const updatedTodo = await this.todoService.markAsDone(user.id, id);
        client.emit('todoMarkedAsDone', updatedTodo);
        client.broadcast.emit('todoMarkedAsDone', updatedTodo);
    }
}
