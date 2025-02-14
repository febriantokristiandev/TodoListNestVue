import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async register(name: string, email: string, password: string) {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) throw new UnauthorizedException('Email already in use');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ name, email, password: hashedPassword });
        await this.userRepository.save(user);
        return { message: 'User registered successfully' };
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({ id: user.id, email: user.email });

        return {
            access_token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                darkMode: user.darkMode, 
                createdAt: user.createdAt,
            },
        };
    }

}
