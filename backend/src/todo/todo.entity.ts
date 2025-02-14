import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.todos)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    title: string;

    @Column('text', { nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium',
    })
    priority: 'High' | 'Medium' | 'Low';

    @Column({
        type: 'enum',
        enum: ['Pending', 'Completed'],
        default: 'Pending',
    })
    status: 'Pending' | 'Completed';

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
