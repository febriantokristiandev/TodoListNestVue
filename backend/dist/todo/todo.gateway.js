"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const todo_service_1 = require("./todo.service");
const user_service_1 = require("../user/user.service");
const todo_dto_1 = require("./dto/todo.dto");
let TodoGateway = class TodoGateway {
    constructor(todoService, userService) {
        this.todoService = todoService;
        this.userService = userService;
    }
    async handleCreateTodo(createTodoDto, client) {
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
        const description = createTodoDto.description || '';
        const priority = createTodoDto.priority || 'Medium';
        const newTodo = await this.todoService.createTodo(userId, createTodoDto.title, description, priority);
        client.emit('todoCreated', newTodo);
        client.broadcast.emit('todoCreated', newTodo);
    }
    async handleUpdateTodo(updateTodoDto, client) {
        const userId = updateTodoDto['userId'];
        console.log(userId);
        if (!userId) {
            client.emit('error', 'User not authenticated');
            return;
        }
        console.log(userId);
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
        const updatedTodo = await this.todoService.updateTodo(userId, updateTodoDto.id, updateTodoDto.title ?? '', updateTodoDto.description ?? '', updateTodoDto.priority ?? 'Medium');
        client.emit('todoUpdated', updatedTodo);
        client.broadcast.emit('todoUpdated', updatedTodo);
    }
    async handleDeleteTodo(deleteTodoDto, client) {
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
        console.log("Deleted todo:", deletedTodo);
        client.emit('todoDeleted', { id, userId });
        client.broadcast.emit('todoDeleted', { id, userId });
    }
    async handleMarkAsDone(markAsDoneDto, client) {
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
};
exports.TodoGateway = TodoGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('createTodo'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_dto_1.CreateTodoDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], TodoGateway.prototype, "handleCreateTodo", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateTodo'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_dto_1.UpdateTodoDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], TodoGateway.prototype, "handleUpdateTodo", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('deleteTodo'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], TodoGateway.prototype, "handleDeleteTodo", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('markAsDone'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], TodoGateway.prototype, "handleMarkAsDone", null);
exports.TodoGateway = TodoGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [todo_service_1.TodoService,
        user_service_1.UserService])
], TodoGateway);
//# sourceMappingURL=todo.gateway.js.map