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
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_entity_1 = require("./todo.entity");
const user_entity_1 = require("../user/user.entity");
let TodoService = class TodoService {
    constructor(todoRepository, userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
    }
    async createTodo(userId, title, description, priority) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        const todo = new todo_entity_1.Todo();
        todo.title = title;
        todo.description = description;
        todo.priority = priority;
        todo.user = user;
        return await this.todoRepository.save(todo);
    }
    async getTodos(userId, status) {
        const query = this.todoRepository.createQueryBuilder('todo')
            .where('todo.user_Id = :userId', { userId });
        if (status) {
            query.andWhere('todo.status = :status', { status });
        }
        return await query.getMany();
    }
    async getTodoById(userId, id) {
        return await this.todoRepository.findOne({
            where: { id, user: { id: userId } },
        });
    }
    async updateTodo(userId, id, title, description, priority) {
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
    async deleteTodo(userId, id) {
        const todo = await this.todoRepository.findOne({
            where: { id, user: { id: userId } },
        });
        if (!todo) {
            throw new Error('Todo not found');
        }
        return await this.todoRepository.remove(todo);
    }
    async markAsDone(userId, id) {
        const todo = await this.todoRepository.findOne({
            where: { id, user: { id: userId } },
        });
        if (!todo) {
            throw new Error('Todo not found');
        }
        if (todo.status === 'Completed') {
            throw new Error('Todo is already completed');
        }
        todo.status = 'Completed';
        return await this.todoRepository.save(todo);
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_entity_1.Todo)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TodoService);
//# sourceMappingURL=todo.service.js.map