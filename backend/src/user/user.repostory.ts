import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({ where: { email } });
    }
    async createUser(userData: { email: string }): Promise<User> {
        const existingUser = await this.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email already registered');
        }

        const user = this.repository.create(userData);
        return this.repository.save(user);
    }

    async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
        await this.repository.update(id, userData);
        return this.repository.findOne({ where: { id } });
    }

    async deleteUser(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
