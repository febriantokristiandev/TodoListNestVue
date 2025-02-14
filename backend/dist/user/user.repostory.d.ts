import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserRepository {
    private readonly repository;
    constructor(repository: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    createUser(userData: {
        email: string;
    }): Promise<User>;
    updateUser(id: number, userData: Partial<User>): Promise<User | null>;
    deleteUser(id: number): Promise<void>;
}
