export interface CreateTask {
    name: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    deadline: Date;
}