import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// Mocking repository
const mockUserRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('updateProfile', () => {
    it('should update and return the updated user profile', async () => {
      const user = new User();
      user.id = 1;
      user.name = 'Test User';
      user.email = 'test@example.com';

      const updateProfileDto = {
        name: 'Updated User',
        email: 'updated@example.com',
        password: 'newpassword',
        darkMode: true,
      };

      userRepository.findOne = jest.fn().mockResolvedValue(user);
      userRepository.save = jest.fn().mockResolvedValue({
        ...user,
        ...updateProfileDto,
        password: 'hashedpassword', // ensure the password is the hashed version
      });

      // Mock bcrypt.hash
      bcrypt.hash = jest.fn().mockResolvedValue('hashedpassword');

      const result = await service.updateProfile(1, updateProfileDto);

      expect(result.name).toBe('Updated User');
      expect(result.email).toBe('updated@example.com');
      expect(result.password).toBe('hashedpassword'); // Now expects the hashed password
      expect(result.darkMode).toBe(true);

      // Ensure bcrypt.hash is called with the correct password
      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword', 10);
    });

    it('should throw an error if the user is not found', async () => {
      const updateProfileDto = {
        name: 'Updated User',
        email: 'updated@example.com',
      };

      userRepository.findOne = jest.fn().mockResolvedValue(null);

      await expect(service.updateProfile(1, updateProfileDto)).rejects.toThrowError(
        new NotFoundException('User not found'),
      );
    });
  });
});
