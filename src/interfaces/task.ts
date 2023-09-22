export interface ICreateTasks {
    name: string;
    description: string;
    priority: string;
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
    id: number;
    status: 'TO DO' | 'DOING' | 'DONE' | 'EXPIRED';
    deadline: string;
    name: string;
    description: string;
    priority: 'High' | 'Medium' | 'Low';
}

export interface IGetTasksUserDate {
    userId: number;
    deadline: string;
}

export interface IUpdateTask {
    id: number;
    userId: number;
    name: string;
    description: string;
    priority: string;
    deadline: string /* Date */;
    status: string;
    timeSpent: number;
    done: boolean;
}