import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { SelectQueryBuilder } from 'typeorm';

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository: Repository<Todo>;

  const mockUser = { id: 1, email: 'test@example.com' } as User;
  const mockTodo = { id: 1, title: 'Test Todo', description: 'Test Description', priority: 'Medium', status: 'Pending', user: mockUser } as Todo;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useClass: Repository,
        },
      ],
    }).compile();

    todoService = moduleRef.get<TodoService>(TodoService);
    todoRepository = moduleRef.get<Repository<Todo>>(getRepositoryToken(Todo));

    jest.spyOn(todoRepository, 'create').mockReturnValue(mockTodo);
    jest.spyOn(todoRepository, 'save').mockResolvedValue(mockTodo);
    jest.spyOn(todoRepository, 'findOne').mockResolvedValue(mockTodo);
    jest.spyOn(todoRepository, 'remove').mockResolvedValue(mockTodo);

    // Mocking createQueryBuilder
    const mockQueryBuilder = {
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([mockTodo]),
    };

    jest.spyOn(todoRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder as unknown as SelectQueryBuilder<Todo>);
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const todoData = { title: 'New Todo', description: 'New Desc', priority: 'High' as 'High' | 'Medium' | 'Low' };

      const result = await todoService.createTodo(mockUser, todoData.title, todoData.description, todoData.priority);
      expect(result).toEqual(mockTodo);
      expect(todoRepository.save).toHaveBeenCalledWith(mockTodo);
    });
  });


  describe('getTodos', () => {
    it('should return all todos', async () => {
      const result = await todoService.getTodos(mockUser, undefined);
      expect(result).toEqual([mockTodo]);
      expect(todoRepository.createQueryBuilder).toHaveBeenCalled();
    });

    it('should return filtered todos by status', async () => {
      const mockTodo = { id: 1, title: 'Test Todo', status: 'Pending' };
      const mockQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([mockTodo]),
      };

      jest.spyOn(todoRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder as any); // Mock createQueryBuilder

      const result = await todoService.getTodos(mockUser, 'Pending');

      // Verify if the createQueryBuilder was called correctly
      expect(todoRepository.createQueryBuilder).toHaveBeenCalledWith('todo'); // Ensure 'todo' is passed as the first argument
      expect(result).toEqual([mockTodo]);
    });


    describe('getTodoById', () => {
      it('should return a single todo', async () => {
        const result = await todoService.getTodoById(mockUser, 1);
        expect(result).toEqual(mockTodo);
        expect(todoRepository.findOne).toHaveBeenCalledWith({ where: { id: 1, user: mockUser } });
      });

      it('should throw NotFoundException if todo not found', async () => {
        jest.spyOn(todoRepository, 'findOne').mockResolvedValueOnce(null); // Mocking null instead of undefined
        await expect(todoService.getTodoById(mockUser, 999)).rejects.toThrow(NotFoundException);
      });
    });

    describe('updateTodo', () => {
      it('should update a todo', async () => {
        const updatedTodo = { ...mockTodo, title: 'Updated Todo' };
        const result = await todoService.updateTodo(mockUser, 1, 'Updated Todo');
        expect(result).toEqual(updatedTodo);
        expect(todoRepository.save).toHaveBeenCalledWith(updatedTodo);
      });
    });

    describe('deleteTodo', () => {
      it('should delete a todo', async () => {
        const result = await todoService.deleteTodo(mockUser, 1);
        expect(result).toEqual(mockTodo);
        expect(todoRepository.remove).toHaveBeenCalledWith(mockTodo);
      });
    });

    describe('markAsDone', () => {
      it('should mark a todo as completed', async () => {
        const updatedTodo = { ...mockTodo, status: 'Completed' };
        const result = await todoService.markAsDone(mockUser, 1);
        expect(result).toEqual(updatedTodo);
        expect(todoRepository.save).toHaveBeenCalledWith(updatedTodo);
      });
    });
  });
});