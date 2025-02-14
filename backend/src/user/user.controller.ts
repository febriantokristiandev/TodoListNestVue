// src/user/user.controller.ts
import { Controller, Get, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return this.userService.getProfile(req.user.id);
    }


    @UseGuards(JwtAuthGuard)
    @Put('profile')
    async updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
        console.log('User from JWT:', req.user); 
        return this.userService.updateProfile(req.user.id, updateProfileDto);
    }

}
