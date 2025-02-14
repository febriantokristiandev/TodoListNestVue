import { User } from '../user/user.entity';
export declare class Todo {
    id: number;
    user: User;
    title: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Pending' | 'Completed';
    createdAt: Date;
    updatedAt: Date;
}
