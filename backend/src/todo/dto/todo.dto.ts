import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(['High', 'Medium', 'Low'])
    priority?: 'High' | 'Medium' | 'Low';
}

export class UpdateTodoDto {
    @IsOptional()
    @IsString()
    id?: number;

    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(['High', 'Medium', 'Low'])
    priority?: 'High' | 'Medium' | 'Low';
}

