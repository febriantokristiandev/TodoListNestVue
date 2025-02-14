import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: any): Promise<import("./user.entity").User>;
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<import("./user.entity").User>;
}
