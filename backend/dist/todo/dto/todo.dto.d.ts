export declare class CreateTodoDto {
    title: string;
    description?: string;
    priority?: 'High' | 'Medium' | 'Low';
}
export declare class UpdateTodoDto {
    id?: number;
    title?: string;
    description?: string;
    priority?: 'High' | 'Medium' | 'Low';
}
