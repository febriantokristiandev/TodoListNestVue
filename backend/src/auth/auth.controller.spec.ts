import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        register: jest.fn().mockResolvedValue({ message: 'User registered successfully' }),
                        login: jest.fn().mockResolvedValue({ access_token: 'mocked_token' }),
                    },
                },
            ],
        }).compile();

        authController = moduleRef.get<AuthController>(AuthController);
        authService = moduleRef.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(authController).toBeDefined();
    });

    describe('register', () => {
        it('should register a user and return a success message', async () => {
            const mockUser = { name: 'John Doe', email: 'john@example.com', password: 'password' };
            await expect(authController.register(mockUser)).resolves.toEqual({ message: 'User registered successfully' });
            expect(authService.register).toHaveBeenCalledWith(mockUser.name, mockUser.email, mockUser.password);
        });
    });

    describe('login', () => {
        it('should login a user and return an access token', async () => {
            const mockLogin = { email: 'john@example.com', password: 'password' };
            await expect(authController.login(mockLogin)).resolves.toEqual({ access_token: 'mocked_token' });
            expect(authService.login).toHaveBeenCalledWith(mockLogin.email, mockLogin.password);
        });
    });
});
