export interface ICreateTasks {
    name: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
    deadline: string /* Date */;
    status: 'TO DO';
    timeSpent: number;
    done: boolean;
    userId: number;
}