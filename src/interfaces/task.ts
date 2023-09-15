export interface CreateTasks {
    name: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    deadline: Date;
}