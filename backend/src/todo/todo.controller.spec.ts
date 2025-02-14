import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { NotFoundException } from '@nestjs/common';

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  const mockUser = { id: 1, email: 'test@example.com' };
  const mockTodo = { id: 1, title: 'Test Todo', description: 'Test Description', priority: 'Medium', status: 'Pending', user: mockUser };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            createTodo: jest.fn().mockResolvedValue(mockTodo),
            getTodos: jest.fn().mockResolvedValue([mockTodo]),
            getTodoById: jest.fn().mockResolvedValue(mockTodo),
            updateTodo: jest.fn().mockResolvedValue({ ...mockTodo, title: 'Updated Todo' }),
            deleteTodo: jest.fn().mockResolvedValue({ message: 'Todo deleted' }),
            markAsDone: jest.fn().mockResolvedValue({ ...mockTodo, status: 'Completed' }),
          },
        },
      ],
    }).compile();

    todoController = moduleRef.get<TodoController>(TodoController);
    todoService = moduleRef.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const dto: CreateTodoDto = { title: 'New Todo', description: 'New Desc', priority: 'High' };
      await expect(todoController.createTodo({ user: mockUser }, dto)).resolves.toEqual(mockTodo);
      expect(todoService.createTodo).toHaveBeenCalledWith(mockUser, dto.title, dto.description, dto.priority);
    });
  });

  describe('getTodos', () => {
    it('should return all todos', async () => {
      await expect(todoController.getTodos({ user: mockUser })).resolves.toEqual([mockTodo]);
      expect(todoService.getTodos).toHaveBeenCalledWith(mockUser, undefined);
    });

    it('should return filtered todos by status', async () => {
      await expect(todoController.getTodos({ user: mockUser }, 'Pending')).resolves.toEqual([mockTodo]);
      expect(todoService.getTodos).toHaveBeenCalledWith(mockUser, 'Pending');
    });
  });

  describe('getTodoById', () => {
    it('should return a single todo', async () => {
      await expect(todoController.getTodoById({ user: mockUser }, 1)).resolves.toEqual(mockTodo);
      expect(todoService.getTodoById).toHaveBeenCalledWith(mockUser, 1);
    });

    it('should throw NotFoundException if todo not found', async () => {
      jest.spyOn(todoService, 'getTodoById').mockRejectedValue(new NotFoundException('Todo not found'));
      await expect(todoController.getTodoById({ user: mockUser }, 999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateTodo', () => {
    it('should update a todo', async () => {
      const dto: UpdateTodoDto = { title: 'Updated Todo' };
      await expect(todoController.updateTodo({ user: mockUser }, 1, dto)).resolves.toEqual({ ...mockTodo, title: 'Updated Todo' });
      expect(todoService.updateTodo).toHaveBeenCalledWith(mockUser, 1, dto.title, undefined, undefined);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', async () => {
      await expect(todoController.deleteTodo({ user: mockUser }, 1)).resolves.toEqual({ message: 'Todo deleted' });
      expect(todoService.deleteTodo).toHaveBeenCalledWith(mockUser, 1);
    });
  });

  describe('markAsDone', () => {
    it('should mark a todo as completed', async () => {
      await expect(todoController.markAsDone({ user: mockUser }, 1)).resolves.toEqual({ ...mockTodo, status: 'Completed' });
      expect(todoService.markAsDone).toHaveBeenCalledWith(mockUser, 1);
    });
  });
});
