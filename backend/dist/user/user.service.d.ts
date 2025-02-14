import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getProfile(userId: number): Promise<User>;
    updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<User>;
}
