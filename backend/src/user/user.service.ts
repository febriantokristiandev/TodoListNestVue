import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    // Menambahkan pengecekan untuk memastikan user ditemukan
    async getProfile(userId: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    // Menambahkan pengecekan untuk memastikan user ditemukan sebelum update
    async updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Update fields if provided
        if (updateProfileDto.name) {
            user.name = updateProfileDto.name;
        }
        if (updateProfileDto.email) {
            user.email = updateProfileDto.email;
        }
        if (updateProfileDto.password) {
            user.password = await bcrypt.hash(updateProfileDto.password, 10);
        }
        if (updateProfileDto.darkMode !== undefined) {
            user.darkMode = updateProfileDto.darkMode;
        }

        return this.userRepository.save(user);
    }
}
