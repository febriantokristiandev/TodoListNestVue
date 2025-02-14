import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NotFoundException } from '@nestjs/common';

// Mock service dan guard
const mockUserService = {
  getProfile: jest.fn(),
  updateProfile: jest.fn(),
};

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard) // Mocking JwtAuthGuard
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const result = { id: 1, name: 'John Doe', email: 'john.doe@example.com' };
      mockUserService.getProfile.mockResolvedValue(result);

      const response = await userController.getProfile('1');
      expect(response).toEqual(result);
      expect(userService.getProfile).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUserService.getProfile.mockResolvedValue(null);

      try {
        await userController.getProfile('999');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('User not found');
      }
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', async () => {
      const updateProfileDto: UpdateProfileDto = { name: 'Jane Doe', email: 'jane.doe@example.com' };
      const result = { id: 1, ...updateProfileDto };
      mockUserService.updateProfile.mockResolvedValue(result);

      const response = await userController.updateProfile('1', updateProfileDto);
      expect(response).toEqual(result);
      expect(userService.updateProfile).toHaveBeenCalledWith(1, updateProfileDto);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const updateProfileDto: UpdateProfileDto = { name: 'Jane Doe', email: 'jane.doe@example.com' };
      mockUserService.updateProfile.mockResolvedValue(null);

      try {
        await userController.updateProfile('999', updateProfileDto);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('User not found');
      }
    });
  });
});
