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

export interface IGetTasksUser {
    userId: number;
}

export interface IGetTasksUserResp {
    status: string;
    deadline: string;
    name: string;
    description: string;
}