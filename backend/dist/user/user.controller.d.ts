import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: any): unknown;
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): unknown;
}
